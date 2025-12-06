'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react'

interface DateSlot {
    date: Date
    available: boolean
    slots: string[]
}

interface BookingCalendarProps {
    onSelect: (date: Date, time: string) => void
}

export function BookingCalendar({ onSelect }: BookingCalendarProps) {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [selectedTime, setSelectedTime] = useState<string | null>(null)
    const [currentMonth, setCurrentMonth] = useState(new Date())

    // Mock Data Generator for next 14 days
    const generateDates = () => {
        const dates: DateSlot[] = []
        const today = new Date()
        for (let i = 0; i < 14; i++) {
            const date = new Date(today)
            date.setDate(today.getDate() + i)
            const isWeekend = date.getDay() === 0 || date.getDay() === 6
            dates.push({
                date,
                available: !isWeekend, // Mock availability
                slots: ['10:00 AM', '11:00 AM', '1:00 PM', '2:30 PM', '4:00 PM']
            })
        }
        return dates
    }

    const availableDates = generateDates()

    const handleDateSelect = (dateSlot: DateSlot) => {
        if (!dateSlot.available) return
        setSelectedDate(dateSlot.date)
        setSelectedTime(null) // Reset time when date changes
    }

    const handleTimeSelect = (time: string) => {
        setSelectedTime(time)
        if (selectedDate) {
            onSelect(selectedDate, time)
        }
    }

    const formatDate = (date: Date) => {
        return {
            day: date.toLocaleDateString('en-US', { weekday: 'short' }),
            date: date.getDate(),
            month: date.toLocaleDateString('en-US', { month: 'short' })
        }
    }

    return (
        <div className="w-full max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <h2 className="font-serif text-2xl">Select Date & Time</h2>
                <div className="flex gap-2">
                    <button className="p-2 hover:bg-gray-100 transition-colors rounded-none border border-transparent hover:border-gray-200">
                        <ChevronLeft size={20} className="text-gray-400" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 transition-colors rounded-none border border-transparent hover:border-gray-200">
                        <ChevronRight size={20} className="text-black" />
                    </button>
                </div>
            </div>

            {/* Date Slider (Horizontal Week View) */}
            <div className="flex gap-4 overflow-x-auto pb-6 no-scrollbar snap-x">
                {availableDates.map((slot, idx) => {
                    const { day, date, month } = formatDate(slot.date)
                    const isSelected = selectedDate?.toDateString() === slot.date.toDateString()

                    return (
                        <button
                            key={idx}
                            onClick={() => handleDateSelect(slot)}
                            disabled={!slot.available}
                            className={`
                                snap-start shrink-0 w-32 h-40 flex flex-col items-center justify-center gap-2 border transition-all duration-300
                                ${isSelected
                                    ? 'bg-black text-white border-black'
                                    : slot.available
                                        ? 'bg-white text-black border-gray-200 hover:border-black'
                                        : 'bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed'}
                            `}
                        >
                            <span className="text-xs uppercase tracking-widest">{month}</span>
                            <span className="font-serif text-4xl">{date}</span>
                            <span className="text-xs font-medium uppercase tracking-wider">{day}</span>
                            {!slot.available && <span className="text-[10px] mt-2">No Slots</span>}
                        </button>
                    )
                })}
            </div>

            {/* Time Slots Grid */}
            <AnimatePresence mode="wait">
                {selectedDate && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="mt-12"
                    >
                        <h3 className="font-serif text-lg mb-6">Available Slots for {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {availableDates.find(d => d.date.toDateString() === selectedDate.toDateString())?.slots.map((time) => (
                                <button
                                    key={time}
                                    onClick={() => handleTimeSelect(time)}
                                    className={`
                                        py-4 border text-sm uppercase tracking-widest transition-all duration-300
                                        ${selectedTime === time
                                            ? 'bg-black text-white border-black'
                                            : 'bg-white text-gray-600 border-gray-200 hover:border-black hover:text-black'}
                                    `}
                                >
                                    {time}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
