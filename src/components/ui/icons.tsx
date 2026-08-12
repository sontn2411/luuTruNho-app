import React from "react";

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
  color?: string;
  strokeWidth?: number | string;
}

export type Icon = React.ComponentType<IconProps>;

// Icon 1: Chổi dọn phòng (Broom / Housekeeping)
export const BroomIcon: Icon = ({
  size = 24,
  className = "",
  color = "currentColor",
  strokeWidth = 2,
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="m15.5 15.5 5.5-5.5a2.121 2.121 0 0 0 0-3l-2.5-2.5a2.121 2.121 0 0 0-3 0l-5.5 5.5" />
    <path d="M10.5 10.5 4 17" />
    <path d="M4 17c-1.1 1.1-.5 3 .5 4s2.9 1.6 4 .5l6.5-6.5" />
    <path d="m14 14 3 3" />
  </svg>
);

// Icon 2: Thẻ phòng / Thẻ từ (KeyCard)
export const KeyCardIcon: Icon = ({
  size = 24,
  className = "",
  color = "currentColor",
  strokeWidth = 2,
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <rect width="18" height="14" x="3" y="5" rx="2" />
    <circle cx="8" cy="12" r="2" />
    <path d="M13 12h3" />
    <path d="M13 15h2" />
  </svg>
);

// Icon 3: Mã QR thanh toán (QRCode)
export const QRCodeIcon: Icon = ({
  size = 24,
  className = "",
  color = "currentColor",
  strokeWidth = 2,
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <rect width="5" height="5" x="3" y="3" rx="1" />
    <rect width="5" height="5" x="16" y="3" rx="1" />
    <rect width="5" height="5" x="3" y="16" rx="1" />
    <path d="M21 16h-3a1 1 0 0 0-1 1v3" />
    <path d="M12 7v3a1 1 0 0 1-1 1H8" />
    <path d="M7 12h1" />
    <path d="M12 16v5" />
    <path d="M16 12h5" />
    <path d="M21 12v3" />
  </svg>
);

// Icon 4: Ví MoMo (MoMo)
export const MoMoIcon: Icon = ({
  size = 24,
  className = "",
  color = "currentColor",
  strokeWidth = 2,
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <rect width="18" height="18" x="3" y="3" rx="4" />
    <path d="M7 15V9l2.5 3.5L12 9v6" />
    <path d="M15 15V9l2.5 3.5L20 9v6" />
  </svg>
);

// Icon 5: VNPay
export const VNPayIcon: Icon = ({
  size = 24,
  className = "",
  color = "currentColor",
  strokeWidth = 2,
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <rect width="20" height="14" x="2" y="5" rx="3" />
    <path d="m6 10 2 4 4-7" />
    <path d="M15 14h3" />
  </svg>
);

// Icon 6: Zalo
export const ZaloIcon: Icon = ({
  size = 24,
  className = "",
  color = "currentColor",
  strokeWidth = 2,
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    <path d="M8 10h4.5l-4.5 4h4.5" />
  </svg>
);

// Icon 7: Logo StayFlow Custom
export const StayFlowLogoIcon: Icon = ({
  size = 24,
  className = "",
  color = "currentColor",
  strokeWidth = 2,
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M3 21h18" />
    <path d="M5 21V7l7-4 7 4v14" />
    <path d="M9 10h2v2H9z" />
    <path d="M13 10h2v2h-2z" />
    <path d="M9 15h2v2H9z" />
    <path d="M13 15h2v2h-2z" />
  </svg>
);

// Icon 8: Hóa đơn đỏ / VAT Invoice
export const InvoiceIcon: Icon = ({
  size = 24,
  className = "",
  color = "currentColor",
  strokeWidth = 2,
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16l3-2 3 2 3-2 3 2 3-2 3 2V8l-6-6z" />
    <path d="M14 2v6h6" />
    <path d="M8 12h8" />
    <path d="M8 16h5" />
  </svg>
);

// Registry tổng hợp tất cả icons (Export dạng object Icons)
export const Icons = {
  broom: BroomIcon,
  keyCard: KeyCardIcon,
  qrCode: QRCodeIcon,
  momo: MoMoIcon,
  vnpay: VNPayIcon,
  zalo: ZaloIcon,
  logo: StayFlowLogoIcon,
  invoice: InvoiceIcon,
};

export default Icons;
