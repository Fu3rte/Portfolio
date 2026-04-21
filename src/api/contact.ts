import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

async function contactSubmit(data: ContactPayload) {
  const res = await axios.post('/api/contact', data);
  return res.data;
}

export function useContactMutation() {
  return useMutation({
    mutationFn: contactSubmit,
  });
}
