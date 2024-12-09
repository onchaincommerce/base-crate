// Add this new file for OnchainKit types
import { ReactNode } from 'react';

export interface CheckoutButtonProps {
  className?: string;
  onClick?: () => void;
  children?: ReactNode;
}

export interface CheckoutRenderProps {
  showModal: () => void;
}

export interface CheckoutProps {
  productId: string;
  onStatus: (status: any) => void;
  children: (props: CheckoutRenderProps) => ReactNode;
} 