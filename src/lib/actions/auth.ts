'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function getCurrentSession() {
  const supabase = createClient();
  const { data: { session }, error } = await supabase.auth.getSession();
  return { session, error };
}

export async function getUserProfile() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return null;

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  return profile;
}

export async function updateProfile(formData: FormData) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'Not authenticated' };
  }

  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  
  const { error } = await supabase
    .from('profiles')
    .update({ 
      first_name: firstName, 
      last_name: lastName,
      updated_at: new Date().toISOString()
    })
    .eq('id', user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/dashboard');
  revalidatePath('/settings');
  return { success: true };
}

export async function signOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect('/signin');
}
