'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';
import {
  FaUser, FaStore, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaArrowRight,
  FaCircleCheck, FaPhone, FaPlus, FaTrash, FaBoxOpen, FaBellConcierge,
} from 'react-icons/fa6';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import * as store from '@/lib/data/demo';

function passwordScore(pass: string) {
  let score = 0;
  if (pass.length >= 8) score += 25;
  if (/[A-Z]/.test(pass)) score += 25;
  if (/[0-9]/.test(pass)) score += 25;
  if (/[^A-Za-z0-9]/.test(pass)) score += 25;
  return score;
}

const SCORE_META = [
  { label: 'Too short', color: 'bg-danger' },
  { label: 'Weak', color: 'bg-danger' },
  { label: 'Fair', color: 'bg-accent' },
  { label: 'Good', color: 'bg-gold' },
  { label: 'Strong', color: 'bg-success' },
];

const CATEGORIES = [
  'Restaurants', 'Cafés', 'Beauty & Spas', 'Health & Fitness', 'Shopping',
  'Automotive', 'Home Services', 'Nightlife', 'Health & Medical',
];

const NEIGHBORHOODS = [
  'Yaba', 'Surulere', 'Ikoyi', 'Lekki', 'Victoria Island', 'Ikeja',
  'Gbagada', 'Maryland', 'Apapa', 'Ajah', 'Ojota', 'Ikorodu',
];

interface BusinessBasics {
  name: string; category: string; address: string;
  neighborhood: string; phone: string; description: string;
}
interface ServiceRow { name: string; price: string; duration: string; description: string; }
interface ProductRow { name: string; description: string; price: string; stock: string; }

function GetStartedContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [accountType, setAccountType] = useState<'user' | 'business'>('user');
  const [step, setStep] = useState(1);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [basics, setBasics] = useState<BusinessBasics | null>(null);
  const [services, setServices] = useState<ServiceRow[]>([]);
  const [products, setProducts] = useState<ProductRow[]>([]);

  useEffect(() => {
    if (searchParams.get('type') === 'business') setAccountType('business');
  }, [searchParams]);

  const score = password ? passwordScore(password) : 0;
  const meta = SCORE_META[score / 25];

  const addServiceRow = () =>
    setServices((s) => [...s, { name: '', price: '', duration: '', description: '' }]);
  const addProductRow = () =>
    setProducts((p) => [...p, { name: '', description: '', price: '', stock: '' }]);

  const collectServices = (form: FormData): ServiceRow[] =>
    form.getAll('serviceName').map((name, i) => ({
      name: String(name).trim(),
      price: String(form.getAll('servicePrice')[i] ?? '').trim(),
      duration: String(form.getAll('serviceDuration')[i] ?? '').trim() || 'Flexible',
      description: String(form.getAll('serviceDescription')[i] ?? '').trim(),
    })).filter((s) => s.name && s.price);

  const collectProducts = (form: FormData): ProductRow[] =>
    form.getAll('productName').map((name, i) => ({
      name: String(name).trim(),
      description: String(form.getAll('productDescription')[i] ?? '').trim(),
      price: String(form.getAll('productPrice')[i] ?? '').trim(),
      stock: String(form.getAll('productStock')[i] ?? '').trim(),
    })).filter((p) => p.name && p.price);

  const finishSignup = (formEl: HTMLFormElement) => {
    const form = new FormData(formEl);
    const email = String(form.get('email') ?? '').trim();
    const firstName = String(form.get('firstName') ?? '').trim();
    const lastName = String(form.get('lastName') ?? '').trim();

    if (!agreed) {
      setError('Please agree to the Terms and Privacy Policy to continue.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    let ownedBusinessId: string | undefined;
    if (accountType === 'business' && basics) {
      ownedBusinessId = store.submitBusiness({
        name: basics.name,
        description: basics.description,
        category: basics.category,
        address: basics.address,
        neighborhood: basics.neighborhood,
        phone: basics.phone,
        email,
        services,
        products: products.map((p) => ({
          name: p.name,
          description: p.description || undefined,
          price: p.price,
          stock: p.stock === '' ? null : Number(p.stock) || 0,
          image: undefined,
        })),
      });
    }

    store.signIn(email, {
      ownedBusinessId,
      firstName: firstName || undefined,
      lastName: lastName || undefined,
    });

    setSubmitting(true);
    setTimeout(() => {
      router.push(accountType === 'business' ? '/business/dashboard' : '/dashboard');
    }, 700);
  };

  const nextFromStep = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (accountType === 'user') {
      finishSignup(e.currentTarget);
      return;
    }

    if (step === 1) {
      const form = new FormData(e.currentTarget);
      const name = String(form.get('businessName') ?? '').trim();
      if (!name) {
        setError('Give your business a name to continue.');
        return;
      }
      setBasics({
        name,
        category: String(form.get('category') ?? 'Shopping'),
        address: String(form.get('address') ?? '').trim(),
        neighborhood: String(form.get('neighborhood') ?? 'Lagos'),
        phone: String(form.get('phone') ?? '').trim(),
        description: String(form.get('businessDescription') ?? '').trim(),
      });
      setStep(2);
    } else if (step === 2) {
      const form = new FormData(e.currentTarget);
      setServices(collectServices(form));
      setProducts(collectProducts(form));
      setStep(3);
    } else {
      finishSignup(e.currentTarget);
    }
  };

  const stepTitle =
    accountType === 'user'
      ? 'Join Finda'
      : step === 1
      ? 'Tell us about your business'
      : step === 2
      ? 'What do you offer?'
      : 'Create your login';

  const stepSubtitle =
    accountType === 'user'
      ? 'Free forever. Book, save, review, and shop local storefronts.'
      : step === 1
      ? 'The basics — name, category, and where customers find you.'
      : step === 2
      ? "Services customers book, and products for your storefront. Skip what you don't sell yet."
      : 'Last step — this becomes the owner login for your business dashboard.';

  return (
    <div className="min-h-screen bg-paper-light dark:bg-paper-dark">
      <Header />

      <main className="pt-28 pb-24 px-6">
        <div className="max-w-xl mx-auto">
          {/* Account type toggle */}
          <div className="grid grid-cols-2 gap-2 p-1.5 bg-sunken-light dark:bg-white/5 rounded-2xl mb-8">
            {([
              { key: 'user', label: "I'm exploring", icon: FaUser },
              { key: 'business', label: 'I own a business', icon: FaStore },
            ] as const).map((opt) => (
              <button
                key={opt.key}
                type="button"
                onClick={() => { setAccountType(opt.key); setStep(1); setError(''); }}
                className={`flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition ${
                  accountType === opt.key
                    ? 'bg-white dark:bg-surface-dark text-ink-900 dark:text-ink-900-inv shadow-card'
                    : 'text-ink-500 dark:text-ink-500-inv hover:text-ink-900 dark:hover:text-ink-900-inv'
                }`}
                aria-pressed={accountType === opt.key}
              >
                <opt.icon aria-hidden /> {opt.label}
              </button>
            ))}
          </div>

          {/* Wizard progress */}
          {accountType === 'business' && (
            <div className="flex items-center gap-2 mb-6" role="progressbar" aria-valuemin={1} aria-valuemax={3} aria-valuenow={step} aria-label="Signup progress">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className={`h-1.5 flex-1 rounded-full transition-colors ${step >= n ? 'bg-primary' : 'bg-sunken-light dark:bg-white/10'}`}
                />
              ))}
              <span className="text-xs font-semibold text-ink-400 dark:text-ink-400-inv ml-2 whitespace-nowrap">
                Step {step} of 3
              </span>
            </div>
          )}

          <div className="card p-8 sm:p-10">
            <h1 className="font-display text-2xl font-bold text-ink-900 dark:text-ink-900-inv mb-1.5">
              {stepTitle}
            </h1>
            <p className="text-muted text-[15px] mb-8">{stepSubtitle}</p>

            <form onSubmit={nextFromStep} className="space-y-5" noValidate>
              {/* ── Business step 1: identity ── */}
              {accountType === 'business' && step === 1 && (
                <>
                  <div>
                    <label htmlFor="businessName" className="field-label">Business name</label>
                    <input id="businessName" name="businessName" type="text" required placeholder="e.g. Nkwo Kitchen" className="field" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="category" className="field-label">Category</label>
                      <select id="category" name="category" className="field" defaultValue="Restaurants">
                        {CATEGORIES.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="neighborhood" className="field-label">Neighborhood</label>
                      <select id="neighborhood" name="neighborhood" className="field" defaultValue="Yaba">
                        {NEIGHBORHOODS.map((n) => (
                          <option key={n} value={n}>{n}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="address" className="field-label">Street address</label>
                    <input id="address" name="address" type="text" required placeholder="14 Herbert Macaulay Way" className="field" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="field-label">Phone / WhatsApp</label>
                    <div className="relative">
                      <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" aria-hidden />
                      <input id="phone" name="phone" type="tel" required placeholder="0803 000 0000" className="field !pl-11" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="businessDescription" className="field-label">
                      Short description <span className="font-normal text-ink-400">(optional)</span>
                    </label>
                    <textarea
                      id="businessDescription"
                      name="businessDescription"
                      rows={3}
                      placeholder="What makes your business worth a visit?"
                      className="field resize-none"
                    />
                  </div>
                </>
              )}

              {/* ── Business step 2: offerings ── */}
              {accountType === 'business' && step === 2 && (
                <>
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h2 className="font-semibold text-ink-900 dark:text-ink-900-inv inline-flex items-center gap-2 text-[15px]">
                        <FaBellConcierge className="text-primary dark:text-primary-bright" aria-hidden /> Services
                      </h2>
                      <button type="button" onClick={addServiceRow} className="btn-secondary btn-sm">
                        <FaPlus aria-hidden /> Add
                      </button>
                    </div>
                    {services.length === 0 ? (
                      <p className="text-sm text-muted italic">No services yet — add bookable services with ₦ prices.</p>
                    ) : (
                      <div className="space-y-3">
                        {services.map((s, i) => (
                          <div key={i} className="grid grid-cols-12 gap-2.5 items-end p-3 bg-sunken-light/50 dark:bg-white/5 rounded-xl">
                            <div className="col-span-12 sm:col-span-4">
                              <label className="field-label !mb-1" htmlFor={`sv-name-${i}`}>Service</label>
                              <input id={`sv-name-${i}`} name="serviceName" defaultValue={s.name} placeholder="Signature Cut" className="field" />
                            </div>
                            <div className="col-span-5 sm:col-span-3">
                              <label className="field-label !mb-1" htmlFor={`sv-price-${i}`}>Price</label>
                              <input id={`sv-price-${i}`} name="servicePrice" defaultValue={s.price} placeholder="₦5,000" className="field" />
                            </div>
                            <div className="col-span-5 sm:col-span-2">
                              <label className="field-label !mb-1" htmlFor={`sv-dur-${i}`}>Duration</label>
                              <input id={`sv-dur-${i}`} name="serviceDuration" defaultValue={s.duration} placeholder="45 min" className="field" />
                            </div>
                            <div className="col-span-10 sm:col-span-2">
                              <label className="field-label !mb-1" htmlFor={`sv-desc-${i}`}>Notes</label>
                              <input id={`sv-desc-${i}`} name="serviceDescription" defaultValue={s.description} placeholder="Optional" className="field" />
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                              <button
                                type="button"
                                onClick={() => setServices(services.filter((_, idx) => idx !== i))}
                                className="w-full py-2.5 rounded-lg text-danger border border-danger/30 hover:bg-danger-soft dark:hover:bg-danger/10 transition inline-flex items-center justify-center"
                                aria-label={`Remove service ${i + 1}`}
                              >
                                <FaTrash aria-hidden />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-2 border-t border-line-light dark:border-line-dark">
                    <div className="flex items-center justify-between mb-3">
                      <h2 className="font-semibold text-ink-900 dark:text-ink-900-inv inline-flex items-center gap-2 text-[15px]">
                        <FaBoxOpen className="text-accent dark:text-accent-bright" aria-hidden /> Storefront products
                      </h2>
                      <button type="button" onClick={addProductRow} className="btn-secondary btn-sm">
                        <FaPlus aria-hidden /> Add
                      </button>
                    </div>
                    {products.length === 0 ? (
                      <p className="text-sm text-muted italic">
                        No products yet — these appear in your Finda storefront for ordering.
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {products.map((p, i) => (
                          <div key={i} className="grid grid-cols-12 gap-2.5 items-end p-3 bg-sunken-light/50 dark:bg-white/5 rounded-xl">
                            <div className="col-span-12 sm:col-span-4">
                              <label className="field-label !mb-1" htmlFor={`pr-name-${i}`}>Product</label>
                              <input id={`pr-name-${i}`} name="productName" defaultValue={p.name} placeholder="Party Jollof Tray" className="field" />
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                              <label className="field-label !mb-1" htmlFor={`pr-price-${i}`}>Price</label>
                              <input id={`pr-price-${i}`} name="productPrice" defaultValue={p.price} placeholder="₦6,500" className="field" />
                            </div>
                            <div className="col-span-6 sm:col-span-2">
                              <label className="field-label !mb-1" htmlFor={`pr-stock-${i}`}>Stock</label>
                              <input id={`pr-stock-${i}`} name="productStock" type="number" min={0} defaultValue={p.stock} placeholder="∞" className="field" />
                            </div>
                            <div className="col-span-10 sm:col-span-2">
                              <label className="field-label !mb-1" htmlFor={`pr-desc-${i}`}>Notes</label>
                              <input id={`pr-desc-${i}`} name="productDescription" defaultValue={p.description} placeholder="Optional" className="field" />
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                              <button
                                type="button"
                                onClick={() => setProducts(products.filter((_, idx) => idx !== i))}
                                className="w-full py-2.5 rounded-lg text-danger border border-danger/30 hover:bg-danger-soft dark:hover:bg-danger/10 transition inline-flex items-center justify-center"
                                aria-label={`Remove product ${i + 1}`}
                              >
                                <FaTrash aria-hidden />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* ── Account details (user flow + business step 3) ── */}
              {(accountType === 'user' || step === 3) && (
                <>
                  {accountType === 'business' && basics && (
                    <div className="p-4 bg-primary-soft dark:bg-primary/10 rounded-xl text-sm text-primary dark:text-primary-bright font-medium">
                      {basics.name} · {basics.category} · {basics.neighborhood}
                      {services.length > 0 && ` · ${services.length} service${services.length > 1 ? 's' : ''}`}
                      {products.length > 0 && ` · ${products.length} product${products.length > 1 ? 's' : ''}`}
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="field-label">First name</label>
                      <input id="firstName" name="firstName" type="text" required autoComplete="given-name" placeholder="Adaeze" className="field" />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="field-label">Last name</label>
                      <input id="lastName" name="lastName" type="text" required autoComplete="family-name" placeholder="Nwosu" className="field" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="field-label">Email address</label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" aria-hidden />
                      <input id="email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" className="field !pl-11" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="password" className="field-label">Password</label>
                    <div className="relative">
                      <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" aria-hidden />
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        required
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="8+ characters"
                        className="field !pl-11 !pr-11"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-700 dark:hover:text-ink-700-inv"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    {password && (
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex-1 h-1.5 bg-sunken-light dark:bg-white/10 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${meta.color}`}
                            style={{ width: `${Math.max(score, 8)}%` }}
                          />
                        </div>
                        <span className="text-xs font-semibold text-ink-500 dark:text-ink-500-inv min-w-[64px] text-right">
                          {meta.label}
                        </span>
                      </div>
                    )}
                  </div>
                </>
              )}

              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded accent-[#1F5C45]"
                />
                <span className="text-sm text-ink-700 dark:text-ink-700-inv leading-relaxed">
                  I agree to the{' '}
                  <Link href="/terms" className="text-primary dark:text-primary-bright font-semibold hover:underline">Terms of Service</Link>
                  {' '}and{' '}
                  <Link href="/privacy" className="text-primary dark:text-primary-bright font-semibold hover:underline">Privacy Policy</Link>
                </span>
              </label>

              {error && (
                <p className="text-sm font-semibold text-danger" role="alert">{error}</p>
              )}

              {/* Navigation */}
              <div className="flex items-center gap-3">
                {accountType === 'business' && step > 1 && (
                  <button
                    type="button"
                    onClick={() => { setStep(step - 1); setError(''); }}
                    className="btn-secondary"
                  >
                    Back
                  </button>
                )}
                <button type="submit" disabled={submitting} className="btn-primary flex-1">
                  {submitting ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-label="Creating account" />
                  ) : (
                    <>
                      {accountType === 'user'
                        ? 'Create my account'
                        : step === 1
                        ? 'Continue to services'
                        : step === 2
                        ? 'Continue to account'
                        : 'Submit for verification'}
                      <FaArrowRight className="text-sm" aria-hidden />
                    </>
                  )}
                </button>
              </div>

              <p className="text-center text-sm text-muted">
                Already have an account?{' '}
                <Link href="/signin" className="text-primary dark:text-primary-bright font-semibold hover:underline">
                  Sign in
                </Link>
              </p>
            </form>
          </div>

          {/* What happens next */}
          <div className="mt-8 card p-6">
            <h2 className="font-semibold text-ink-900 dark:text-ink-900-inv mb-4 text-sm uppercase tracking-[0.1em]">
              What happens next
            </h2>
            <ol className="space-y-3">
              {(accountType === 'user'
                ? ['Confirm your email address', 'Explore and save your first spots', 'Book or order — reminders included']
                : ['We review your listing (usually 1–2 days)', 'Get your verified badge', 'Your storefront goes live for orders']
              ).map((stepText, i) => (
                <li key={stepText} className="flex items-center gap-3 text-sm text-ink-700 dark:text-ink-700-inv">
                  <span className="w-6 h-6 rounded-full bg-primary-soft dark:bg-primary/15 text-primary dark:text-primary-bright text-xs font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  {stepText}
                  {i === 2 && <FaCircleCheck className="text-success ml-auto" aria-hidden />}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function GetStarted() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-paper-light dark:bg-paper-dark" />}>
      <GetStartedContent />
    </Suspense>
  );
}
