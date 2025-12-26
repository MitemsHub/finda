'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function createBooking(formData: FormData) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'Not authenticated' };
  }

  const businessId = formData.get('businessId') as string;
  const serviceName = formData.get('serviceName') as string;
  const date = formData.get('date') as string;
  const time = formData.get('time') as string;
  const notes = formData.get('notes') as string;

  // Combine date and time
  const bookingDate = new Date(`${date}T${time}`);

  const { error } = await supabase
    .from('bookings')
    .insert({
      user_id: user.id,
      business_id: businessId,
      service_name: serviceName,
      booking_date: bookingDate.toISOString(),
      notes,
      status: 'pending'
    });

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/bookings');
  return { success: true };
}

export async function getUserBookings() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from('bookings')
    .select('*, businesses(name, image_url)')
    .eq('user_id', user.id)
    .order('booking_date', { ascending: true });

  if (error) return [];
  return data;
}

export async function getBusinessBookings(businessId: string) {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('bookings')
    .select('*, profiles(first_name, last_name, email)')
    .eq('business_id', businessId)
    .order('booking_date', { ascending: true });

  if (error) return [];
  return data;
}
