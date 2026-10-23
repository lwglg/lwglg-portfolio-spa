'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLocaleStore } from '@/stores/localeStore';
import { useContactStore } from '@/stores/contactStore';
import { getDictionary } from '@/i18n';
import { createContactSchema } from '@/schemas/contactSchema';
import { submitContactForm } from '@/actions/contactActions';
import type { ContactFormData } from '@/types';
import { COUNTRY_CODES, DEFAULT_COUNTRY_CODE } from '@/constants';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Spinner } from '@/components/ui/Spinner';

export function ContactForm() {
  const locale = useLocaleStore((s) => s.locale);
  const dict = getDictionary(locale);
  const status = useContactStore((s) => s.status);
  const errorMessage = useContactStore((s) => s.errorMessage);
  const reset = useContactStore((s) => s.reset);

  const schema = createContactSchema(dict);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset: resetForm,
  } = useForm<ContactFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      organisation: '',
      countryCode: DEFAULT_COUNTRY_CODE,
      phone: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      await submitContactForm(data, dict);
      resetForm();
    } catch {
      // error already in store
    }
  };

  if (status === 'success') {
    return (
      <Card className="mx-auto max-w-lg shadow-none">
        <CardHeader>
          <CardTitle>{dict.contact.form.success}</CardTitle>
        </CardHeader>
        <CardContent>
          <Button type="button" onClick={reset}>
            {dict.contact.form.submit}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mx-auto max-w-lg shadow-none">
      <CardHeader>
        <CardTitle>{dict.contact.title}</CardTitle>
        <CardDescription>{dict.contact.subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="firstName">{dict.contact.form.firstName}</Label>
              <Input id="firstName" {...register('firstName')} aria-invalid={!!errors.firstName} />
              {errors.firstName && (
                <p className="mt-1 text-xs text-destructive">{errors.firstName.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="lastName">{dict.contact.form.lastName}</Label>
              <Input id="lastName" {...register('lastName')} aria-invalid={!!errors.lastName} />
              {errors.lastName && (
                <p className="mt-1 text-xs text-destructive">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="email">{dict.contact.form.email}</Label>
            <Input id="email" type="email" {...register('email')} aria-invalid={!!errors.email} />
            {errors.email && (
              <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="organisation">{dict.contact.form.organisation}</Label>
            <Input id="organisation" {...register('organisation')} />
            {errors.organisation && (
              <p className="mt-1 text-xs text-destructive">{errors.organisation.message}</p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-[minmax(9.5rem,11rem)_1fr]">
            <div>
              <Label htmlFor="countryCode">{dict.contact.form.countryCode}</Label>
              <Select id="countryCode" options={COUNTRY_CODES} {...register('countryCode')} />
            </div>
            <div>
              <Label htmlFor="phone">{dict.contact.form.phone}</Label>
              <Input id="phone" type="tel" placeholder="11 98765-4321" {...register('phone')} />
            </div>
          </div>

          <div>
            <Label htmlFor="message">{dict.contact.form.message}</Label>
            <Textarea
              id="message"
              rows={5}
              {...register('message')}
              aria-invalid={!!errors.message}
            />
            {errors.message && (
              <p className="mt-1 text-xs text-destructive">{errors.message.message}</p>
            )}
          </div>

          {status === 'error' && errorMessage && (
            <p className="text-sm text-destructive">{errorMessage}</p>
          )}

          <Button type="submit" disabled={status === 'submitting'} className="w-full">
            {status === 'submitting' ? (
              <span className="inline-flex items-center gap-2">
                <Spinner size="sm" />
                {dict.contact.form.submitting}
              </span>
            ) : (
              dict.contact.form.submit
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
