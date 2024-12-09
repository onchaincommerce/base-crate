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