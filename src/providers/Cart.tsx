'use client'
/*
  Preview-only cart. Mirrors the surface of
  `useCart()` from '@payloadcms/plugin-ecommerce/client/react'
  (cart.items, addItem, removeItem, incrementItem, decrementItem, clearCart)
  so components switch to the real hook with an import change.
  Difference: Payload's addItem takes IDs ({ product: id, variant: id });
  here we pass objects because there is no server to resolve them.
*/
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { Cart, CartItem, Product, Variant } from '@/lib/types'

type CartContext = {
  cart: Cart
  isOpen: boolean
  setOpen: (open: boolean) => void
  addItem: (item: { product: Product; variant?: Variant }, quantity?: number) => Promise<void>
  removeItem: (id: string) => void
  incrementItem: (id: string) => void
  decrementItem: (id: string) => void
  clearCart: () => void
  totalQuantity: number
  subtotal: number
}

const Ctx = createContext<CartContext | null>(null)
const KEY = 'preview-cart-v1'

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setOpen] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY)
      if (raw) setItems(JSON.parse(raw))
    } catch {}
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(items))
    } catch {}
  }, [items])

  const addItem = useCallback<CartContext['addItem']>(async ({ product, variant }, quantity = 1) => {
    const id = variant?.id ?? product.id
    setItems((prev) => {
      const existing = prev.find((i) => i.id === id)
      if (existing) return prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + quantity } : i))
      return [...prev, { id, product, variant, quantity }]
    })
    setOpen(true)
  }, [])

  const removeItem = useCallback((id: string) => setItems((p) => p.filter((i) => i.id !== id)), [])
  const incrementItem = useCallback(
    (id: string) => setItems((p) => p.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i))),
    [],
  )
  const decrementItem = useCallback(
    (id: string) =>
      setItems((p) =>
        p.flatMap((i) => (i.id !== id ? [i] : i.quantity > 1 ? [{ ...i, quantity: i.quantity - 1 }] : [])),
      ),
    [],
  )
  const clearCart = useCallback(() => setItems([]), [])

  const value = useMemo<CartContext>(() => {
    const totalQuantity = items.reduce((n, i) => n + i.quantity, 0)
    const subtotal = items.reduce(
      (n, i) => n + (i.variant?.priceInRSD ?? i.product.priceInRSD) * i.quantity,
      0,
    )
    return {
      cart: { items },
      isOpen,
      setOpen,
      addItem,
      removeItem,
      incrementItem,
      decrementItem,
      clearCart,
      totalQuantity,
      subtotal,
    }
  }, [items, isOpen, addItem, removeItem, incrementItem, decrementItem, clearCart])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useCart() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>')
  return ctx
}
