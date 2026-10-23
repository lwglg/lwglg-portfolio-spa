import * as yup from 'yup';
import type { Dictionary } from '@/i18n';

/** UTF-8-friendly name pattern: letters (incl. non-Latin), accents, hyphens, spaces, apostrophes */
const NAME_REGEX = /^[\p{L}\p{M}\p{N}\p{P}\p{Z}\p{S}]+$/u;

export function createContactSchema(dict: Dictionary) {
  const v = dict.contact.validation;

  return yup.object({
    firstName: yup
      .string()
      .required(v.required)
      .max(70, v.maxLength.replace('{{max}}', '70'))
      .matches(NAME_REGEX, v.namePattern),
    lastName: yup
      .string()
      .required(v.required)
      .max(70, v.maxLength.replace('{{max}}', '70'))
      .matches(NAME_REGEX, v.namePattern),
    email: yup
      .string()
      .required(v.required)
      .email(v.email)
      .max(255, v.maxLength.replace('{{max}}', '255')),
    organisation: yup
      .string()
      .optional()
      .max(255, v.maxLength.replace('{{max}}', '255'))
      .matches(NAME_REGEX, { message: v.namePattern, excludeEmptyString: true }),
    countryCode: yup.string().required(v.required),
    phone: yup.string().optional().max(30, v.maxLength.replace('{{max}}', '30')),
    message: yup.string().required(v.required).max(1000, v.maxLength.replace('{{max}}', '1000')),
  });
}

export type ContactSchema = yup.InferType<ReturnType<typeof createContactSchema>>;
