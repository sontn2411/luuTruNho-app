export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      rooms: {
        Row: {
          id: string;
          name: string;
          type: string;
          price_per_night: number;
          status: 'available' | 'occupied' | 'dirty' | 'maintenance';
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          type: string;
          price_per_night: number;
          status?: 'available' | 'occupied' | 'dirty' | 'maintenance';
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          type?: string;
          price_per_night?: number;
          status?: 'available' | 'occupied' | 'dirty' | 'maintenance';
          created_at?: string;
        };
      };
      bookings: {
        Row: {
          id: string;
          room_id: string;
          guest_id: string;
          check_in: string;
          check_out: string;
          total_price: number;
          status: 'pending' | 'confirmed' | 'checked_in' | 'checked_out' | 'cancelled';
          created_at: string;
        };
        Insert: {
          id?: string;
          room_id: string;
          guest_id: string;
          check_in: string;
          check_out: string;
          total_price: number;
          status?: 'pending' | 'confirmed' | 'checked_in' | 'checked_out' | 'cancelled';
          created_at?: string;
        };
        Update: {
          id?: string;
          room_id?: string;
          guest_id?: string;
          check_in?: string;
          check_out?: string;
          total_price?: number;
          status?: 'pending' | 'confirmed' | 'checked_in' | 'checked_out' | 'cancelled';
          created_at?: string;
        };
      };
      guests: {
        Row: {
          id: string;
          full_name: string;
          phone: string;
          email: string | null;
          id_card: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          full_name: string;
          phone: string;
          email?: string | null;
          id_card?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          phone?: string;
          email?: string | null;
          id_card?: string | null;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
