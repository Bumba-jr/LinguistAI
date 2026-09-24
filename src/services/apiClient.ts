import { supabase } from '../lib/supabase';

export const getApiHeaders = async (headers?: HeadersInit): Promise<Headers> => {
  const result = new Headers(headers);
  const { data: { session } } = await supabase.auth.getSession();
  if (session?.access_token) result.set('Authorization', `Bearer ${session.access_token}`);
  return result;
};

export const fetchWithAuth = async (input: RequestInfo | URL, init: RequestInit = {}) =>
  fetch(input, { ...init, headers: await getApiHeaders(init.headers) });
