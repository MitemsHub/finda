'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function getBusinesses(filters?: { category?: string; search?: string }) {
  const supabase = createClient();
  let query = supabase.from('businesses').select('*, categories(name, icon)').eq('status', 'approved');

  if (filters?.category) {
    query = query.eq('category', filters.category);
  }

  if (filters?.search) {
    query = query.ilike('name', `%${filters.search}%`);
  }

  const { data, error } = await query.order('rating', { ascending: false });
  
  if (error) {
    console.error('Error fetching businesses:', error);
    return [];
  }

  return data;
}

export async function getBusinessById(id: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('businesses')
    .select('*, categories(*), reviews(*, profiles(first_name, last_name, avatar_url))')
    .eq('id', id)
    .single();

  if (error) return null;
  return data;
}

export async function createBusiness(formData: FormData) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'Not authenticated' };
  }

  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const category_id = formData.get('category_id') as string;
  const address = formData.get('address') as string;
  const phone = formData.get('phone') as string;
  const email = formData.get('email') as string;
  const website = formData.get('website') as string;

  const { data, error } = await supabase
    .from('businesses')
    .insert({
      owner_id: user.id,
      name,
      description,
      category_id,
      address,
      phone,
      email,
      website,
      status: 'pending' // Requires admin approval
    })
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/admin/businesses');
  return { success: true, businessId: data.id };
}

export async function updateBusinessStatus(businessId: string, status: 'approved' | 'rejected') {
  const supabase = createClient();
  
  // Check if admin (optional: depends on RLS, but good to check here too)
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Unauthorized' };

  const { error } = await supabase
    .from('businesses')
    .update({ status })
    .eq('id', businessId);

  if (error) return { error: error.message };

  revalidatePath('/admin/businesses');
  return { success: true };
}
