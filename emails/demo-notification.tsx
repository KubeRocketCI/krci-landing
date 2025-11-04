import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface DemoNotificationEmailProps {
  email: string;
  datetime: string;
  datetimeISO: string;
}

export default function DemoNotificationEmail({
  email = "test@example.com",
  datetime = "Monday, January 15, 2024 at 14:00 (EET)",
  datetimeISO = "2024-01-15T12:00:00.000Z",
}: DemoNotificationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New demo request from {email}</Preview>
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container className="border border-solid border-gray-300 rounded my-10 mx-auto p-5 max-w-xl">
            <Heading className="text-2xl font-bold mb-4">
              🚀 New Demo Request
            </Heading>

            <Section className="mb-4">
              <Text className="text-base mb-2">
                <strong>Email:</strong> {email}
              </Text>
              <Text className="text-base mb-2">
                <strong>Requested Date & Time:</strong>
              </Text>
              <Text className="text-lg font-semibold text-blue-600 mb-2">
                {datetime}
              </Text>
              <Text className="text-sm text-gray-500 font-mono">
                ISO: {datetimeISO}
              </Text>
            </Section>

            <Hr className="my-4" />

            <Section className="bg-blue-50 p-4 rounded">
              <Text className="text-sm font-semibold mb-2">📅 Next Steps:</Text>
              <Text className="text-sm mb-1">
                1. Confirm availability for this time slot
              </Text>
              <Text className="text-sm mb-1">
                2. Send calendar invite to {email}
              </Text>
              <Text className="text-sm">3. Prepare demo materials</Text>
            </Section>

            <Hr className="my-4" />

            <Text className="text-gray-500 text-sm">
              Reply to this email to contact {email} directly.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
