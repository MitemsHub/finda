'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function addReview(formData: FormData) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'Not authenticated' };
  }

  const businessId = formData.get('businessId') as string;
  const rating = parseInt(formData.get('rating') as string);
  const comment = formData.get('comment') as string;

  const { error } = await supabase
    .from('reviews')
    .insert({
      user_id: user.id,
      business_id: businessId,
      rating,
      comment
    });

  if (error) {
    return { error: error.message };
  }

  // Optional: Update business average rating (could be done via trigger or here)
  // For simplicity, we rely on client-side calculation or periodic updates, 
  // but a trigger in SQL is better for consistency.

  revalidatePath(`/business/${businessId}`);
  return { success: true };
}

export async function getBusinessReviews(businessId: string) {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('reviews')
    .select('*, profiles(first_name, last_name, avatar_url)')
    .eq('business_id', businessId)
    .order('created_at', { ascending: false });

  if (error) return [];
  return data;
}
