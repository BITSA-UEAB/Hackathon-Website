import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do I join BITSA?",
    answer: "You can join BITSA by clicking the 'Join BITSA' button on our website or contacting us via email. Membership is open to all IT students at UEAB.",
  },
  {
    question: "What events does BITSA organize?",
    answer: "BITSA organizes workshops, hackathons, tech talks, networking events, and more throughout the academic year.",
  },
  {
    question: "How can I contact the leadership team?",
    answer: "You can find contact details for our leadership team on the Contact page, or email us at bitsaclub@ueab.ac.ke.",
  },
  {
    question: "Can non-IT students participate in BITSA events?",
    answer: "Yes! While BITSA is focused on IT students, many of our events are open to all students interested in technology.",
  },
  {
    question: "How do I stay updated on BITSA activities?",
    answer: "Follow us on social media and check our website regularly for updates on upcoming events and news.",
  },
];

const FAQSection = () => (
  <section className="py-16 bg-white">
    <div className="container mx-auto px-4 max-w-3xl">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-blue-700">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="space-y-4">
        {faqs.map((faq, idx) => (
          <AccordionItem key={idx} value={String(idx)}>
            <AccordionTrigger className="text-lg font-semibold text-blue-900 bg-blue-50 rounded-xl px-4 py-3 hover:bg-blue-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-gray-700 px-4 py-3 bg-blue-50 rounded-b-xl">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export default FAQSection;
