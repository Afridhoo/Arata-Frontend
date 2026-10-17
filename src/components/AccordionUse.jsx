import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function AccordionUse({ data, fullSize  , noPy}) {
  return (
    <section className={`${!noPy && 'py-20'} border-b border-gray-100`}>
      <h2 className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-2">
        FAQ
      </h2>
      <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-10 leading-snug">
        Pertanyaan Umum
      </h3>
      <div className="max-w-2xl">
        <Accordion >
          {data?.map((el, idx) => (
            <AccordionItem key={idx} className="border-b border-gray-100 py-1">
              <AccordionTrigger className="text-base font-medium gap-20 text-gray-900 cursor-pointer py-5 hover:text-gray-600 transition-colors ">
                {el.question}
              </AccordionTrigger>
              <AccordionContent
                className={`text-base text-gray-500 leading-relaxed pb-5 ${!fullSize && "max-w-[500px] flex-wrap"}`}
              >
                {el.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
