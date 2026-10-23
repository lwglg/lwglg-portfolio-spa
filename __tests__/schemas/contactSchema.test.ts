import { getDictionary } from '@/i18n';
import { createContactSchema } from '@/schemas/contactSchema';

const dict = getDictionary('pt-BR');
const schema = createContactSchema(dict);

describe('createContactSchema', () => {
  it('accepts valid full payload', async () => {
    const data = {
      firstName: 'José',
      lastName: "O'Connor-Silva",
      email: 'jose@example.com',
      organisation: 'Acme Ltda',
      countryCode: '+55',
      phone: '11987654321',
      message: 'Olá, gostaria de conversar sobre um projeto.',
    };
    await expect(schema.validate(data)).resolves.toMatchObject(data);
  });

  it('rejects empty firstName', async () => {
    await expect(
      schema.validate({
        firstName: '',
        lastName: 'Silva',
        email: 'a@b.com',
        countryCode: '+55',
        message: 'x',
      }),
    ).rejects.toThrow();
  });

  it('rejects invalid email', async () => {
    await expect(
      schema.validate({
        firstName: 'Ana',
        lastName: 'Silva',
        email: 'not-an-email',
        countryCode: '+55',
        message: 'Hello',
      }),
    ).rejects.toThrow();
  });

  it('rejects name with digits', async () => {
    await expect(
      schema.validate({
        firstName: 'Ana123',
        lastName: 'Silva',
        email: 'a@b.com',
        countryCode: '+55',
        message: 'Hi',
      }),
    ).rejects.toThrow();
  });

  it('allows optional organisation and phone to be empty', async () => {
    const data = {
      firstName: 'Maria',
      lastName: 'Santos',
      email: 'maria@test.com',
      countryCode: '+44',
      message: 'Message body',
    };
    await expect(schema.validate(data)).resolves.toBeTruthy();
  });

  it('enforces max length on message', async () => {
    await expect(
      schema.validate({
        firstName: 'A',
        lastName: 'B',
        email: 'a@b.com',
        countryCode: '+1',
        message: 'x'.repeat(1001),
      }),
    ).rejects.toThrow();
  });
});
