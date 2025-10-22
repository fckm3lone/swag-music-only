"use client"

import {useState} from "react"
import {addDays, format, isAfter, isBefore} from "date-fns"
import {Clock8} from "lucide-react"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import {Calendar} from "@/components/ui/calendar"
import {cn} from "@/lib/utils"
import {useOrderStore} from "@/store/orderStore";
import {useValidationStore} from "@/store/validationStore";

interface Props {
    className?: string;
}

export default function DeliveryDataPicker ({className}: Props) {
    const {deliveryDate, setDeliveryDate} = useOrderStore()
    const { isDeliveryDate, messageDeliveryDate } = useValidationStore();
    const [open, setOpen] = useState(false)

    const tomorrow = addDays(new Date(), 1)
    const maxDate = addDays(tomorrow, 30)

    return (

        <div className="flex flex-col gap-3.75">
            <p className="text-lg font-regular">Delivery date</p>

            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <button
                        className={cn(
                          "flex items-center gap-2 text-md text-muted-foreground hover:text-foreground transition-colors rounded-[12px] px-3 py-2",
                          !isDeliveryDate && "border-red-500"
                        )}
                        onClick={() => setOpen(!open)}
                    >
                        <Clock8 className="w-5 h-5 md:w-7.5 md:h-7.5" strokeWidth={1.25}/>
                        <span>
              Delivery will be on{" "}
                            <span className="text-secondary font-regular text-md">
                {deliveryDate ? format(deliveryDate, "dd.MM.yyyy") : ""}
              </span>
            </span>
                        <svg
                            className={cn(
                                "w-5 h-5 transition-transform",
                                open ? "rotate-180" : "rotate-0"
                            )}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path d="M6 9l6 6 6-6" />
                        </svg>
                    </button>
                </PopoverTrigger>
                {!isDeliveryDate && messageDeliveryDate && (
                  <p className="text-red-500 text-sm">{messageDeliveryDate}</p>
                )}

                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={deliveryDate}
                        required={true}
                        onSelect={(date) => {
                            if (date) {
                                setDeliveryDate(date)
                            }
                        }}

                        disabled={(deliveryDate) =>
                            isBefore(deliveryDate, tomorrow) || isAfter(deliveryDate, maxDate)
                        }
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
};
