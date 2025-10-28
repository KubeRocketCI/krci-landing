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

interface ContactNotificationEmailProps {
  name: string;
  email: string;
  question: string;
}

export default function ContactNotificationEmail({
  name = "Test User",
  email = "test@example.com",
  question = "This is a test question.",
}: ContactNotificationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New contact form submission from {name}</Preview>
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container className="border border-solid border-gray-300 rounded my-10 mx-auto p-5 max-w-xl">
            <Heading className="text-2xl font-bold mb-4">
              New Contact Form Submission
            </Heading>

            <Section className="mb-4">
              <Text className="text-base mb-2">
                <strong>Name:</strong> {name}
              </Text>
              <Text className="text-base mb-2">
                <strong>Email:</strong> {email}
              </Text>
            </Section>

            <Hr className="my-4" />

            <Section>
              <Text className="text-base font-semibold mb-2">Question:</Text>
              <Text className="text-base whitespace-pre-wrap">{question}</Text>
            </Section>

            <Hr className="my-4" />

            <Text className="text-gray-500 text-sm">
              Reply to this email to respond directly to {name}.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
