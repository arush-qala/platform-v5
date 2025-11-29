'use client'

import { motion, Reorder } from 'framer-motion'
import Image from 'next/image'
import { X, ArrowRight } from 'lucide-react'
import { useAssortment } from './AssortmentContext'

type Props = {
    onClose: () => void
    onNavigate: (product: any) => void
                    onClick = { onClose }
className = "absolute inset-0 bg-black/60 backdrop-blur-sm"
    />

    {/* Modal Card */ }
    < motion.div
initial = {{ scale: 0.9, opacity: 0, y: 20 }}
animate = {{ scale: 1, opacity: 1, y: 0 }}
exit = {{ scale: 0.9, opacity: 0, y: 20 }}
transition = {{ type: 'spring', damping: 25, stiffness: 300 }}
className = "relative w-full max-w-6xl h-[85vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
    >
    {/* Header */ }
    < div className = "flex items-center justify-between px-12 py-8 border-b border-gray-100" >
                        <h2 className="text-3xl font-serif">Your Assortment ({items.length})</h2>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <X size={32} />
                        </button>
                    </div >

    {/* Reorderable Content */ }
    < div className = "flex-1 overflow-x-auto overflow-y-hidden flex items-center p-12 bg-gray-50/50" >
        <Reorder.Group
            axis="x"
            values={items}
            onReorder={setItems}
            className="flex gap-8 mx-auto"
        >
            {items.map((item, index) => (
                <Reorder.Item
                    key={item.id}
                    value={item}
                    className="relative aspect-[3/4] w-[280px] bg-white shadow-xl rounded-xl overflow-hidden group cursor-grab active:cursor-grabbing border border-gray-100"
                    onClick={() => {
                        // Optional: Navigate on click if not dragging
                        // onNavigate(item)
                    }}
                >
                    <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover pointer-events-none" // Prevent image drag interfering
                    />

                    {/* Number Badge */}
                    <div className="absolute top-4 left-4 w-10 h-10 bg-black/80 backdrop-blur-md rounded-full flex items-center justify-center z-10 shadow-lg border border-white/20">
                        <span className="text-lg font-serif text-white">{index + 1}</span>
                    </div>

                    {/* Remove Button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            removeItem(item.id)
                        }}
                        className="absolute top-4 right-4 w-8 h-8 bg-white/90 hover:bg-red-500 hover:text-white backdrop-blur-md rounded-full flex items-center justify-center transition-all z-10 shadow-lg opacity-0 group-hover:opacity-100"
                    >
                        <X size={16} />
                    </button>

                    {/* Overlay Info */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6 pointer-events-none">
                        <div className="text-white text-center transform translate-y-4 group-hover:translate-y-0 transition-transform">
                            <p className="font-serif text-xl mb-1">{item.name}</p>
                            <p className="text-sm opacity-90">{item.price}</p>
                        </div>
                    </div>
                </Reorder.Item>
            ))}
        </Reorder.Group>
                    </div >

    {/* Footer Actions */ }
    < div className = "px-12 py-8 border-t border-gray-100 flex justify-end items-center gap-8 bg-white" >
                        <div className="text-sm text-gray-500 font-medium">
                            Drag to reorder • {items.length}/10 Styles Selected
                        </div>
                        <button
                            disabled
                            className="px-8 py-4 bg-black text-white uppercase tracking-widest text-sm flex items-center gap-2 rounded-full hover:bg-gray-800 transition-colors shadow-lg"
                        >
                            Continue <ArrowRight size={16} />
                        </button>
                    </div >
                </motion.div >
            </div >
        )
    }
