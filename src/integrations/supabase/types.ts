export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      blood_banks: {
        Row: {
          address: string | null
          area: string | null
          city: string
          created_at: string
          email: string | null
          id: string
          is_active: boolean
          latitude: number | null
          license_url: string | null
          longitude: number | null
          name: string
          phone: string | null
          pin_code: string | null
          updated_at: string
          user_id: string
          verification_status: Database["public"]["Enums"]["verification_status"]
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          address?: string | null
          area?: string | null
          city: string
          created_at?: string
          email?: string | null
          id?: string
          is_active?: boolean
          latitude?: number | null
          license_url?: string | null
          longitude?: number | null
          name: string
          phone?: string | null
          pin_code?: string | null
          updated_at?: string
          user_id: string
          verification_status?: Database["public"]["Enums"]["verification_status"]
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          address?: string | null
          area?: string | null
          city?: string
          created_at?: string
          email?: string | null
          id?: string
          is_active?: boolean
          latitude?: number | null
          license_url?: string | null
          longitude?: number | null
          name?: string
          phone?: string | null
          pin_code?: string | null
          updated_at?: string
          user_id?: string
          verification_status?: Database["public"]["Enums"]["verification_status"]
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: []
      }
      blood_requests: {
        Row: {
          area: string | null
          blood_group: string
          city: string
          contact_phone: string
          created_at: string
          fulfilled_at: string | null
          fulfilled_by_blood_bank_id: string | null
          fulfilled_by_donor_id: string | null
          hospital_name: string | null
          id: string
          notes: string | null
          patient_name: string | null
          requester_id: string | null
          status: Database["public"]["Enums"]["request_status"]
          units_needed: number
          updated_at: string
          urgency_level: string
        }
        Insert: {
          area?: string | null
          blood_group: string
          city: string
          contact_phone: string
          created_at?: string
          fulfilled_at?: string | null
          fulfilled_by_blood_bank_id?: string | null
          fulfilled_by_donor_id?: string | null
          hospital_name?: string | null
          id?: string
          notes?: string | null
          patient_name?: string | null
          requester_id?: string | null
          status?: Database["public"]["Enums"]["request_status"]
          units_needed?: number
          updated_at?: string
          urgency_level?: string
        }
        Update: {
          area?: string | null
          blood_group?: string
          city?: string
          contact_phone?: string
          created_at?: string
          fulfilled_at?: string | null
          fulfilled_by_blood_bank_id?: string | null
          fulfilled_by_donor_id?: string | null
          hospital_name?: string | null
          id?: string
          notes?: string | null
          patient_name?: string | null
          requester_id?: string | null
          status?: Database["public"]["Enums"]["request_status"]
          units_needed?: number
          updated_at?: string
          urgency_level?: string
        }
        Relationships: [
          {
            foreignKeyName: "blood_requests_fulfilled_by_blood_bank_id_fkey"
            columns: ["fulfilled_by_blood_bank_id"]
            isOneToOne: false
            referencedRelation: "blood_banks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blood_requests_fulfilled_by_donor_id_fkey"
            columns: ["fulfilled_by_donor_id"]
            isOneToOne: false
            referencedRelation: "donors"
            referencedColumns: ["id"]
          },
        ]
      }
      blood_stock: {
        Row: {
          availability: Database["public"]["Enums"]["blood_availability"]
          blood_bank_id: string
          blood_group: string
          id: string
          units_available: number
          updated_at: string
        }
        Insert: {
          availability?: Database["public"]["Enums"]["blood_availability"]
          blood_bank_id: string
          blood_group: string
          id?: string
          units_available?: number
          updated_at?: string
        }
        Update: {
          availability?: Database["public"]["Enums"]["blood_availability"]
          blood_bank_id?: string
          blood_group?: string
          id?: string
          units_available?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "blood_stock_blood_bank_id_fkey"
            columns: ["blood_bank_id"]
            isOneToOne: false
            referencedRelation: "blood_banks"
            referencedColumns: ["id"]
          },
        ]
      }
      donation_history: {
        Row: {
          blood_bank_id: string | null
          blood_request_id: string | null
          created_at: string
          donation_date: string
          donor_id: string
          id: string
          notes: string | null
          units_donated: number
        }
        Insert: {
          blood_bank_id?: string | null
          blood_request_id?: string | null
          created_at?: string
          donation_date?: string
          donor_id: string
          id?: string
          notes?: string | null
          units_donated?: number
        }
        Update: {
          blood_bank_id?: string | null
          blood_request_id?: string | null
          created_at?: string
          donation_date?: string
          donor_id?: string
          id?: string
          notes?: string | null
          units_donated?: number
        }
        Relationships: [
          {
            foreignKeyName: "donation_history_blood_bank_id_fkey"
            columns: ["blood_bank_id"]
            isOneToOne: false
            referencedRelation: "blood_banks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "donation_history_blood_request_id_fkey"
            columns: ["blood_request_id"]
            isOneToOne: false
            referencedRelation: "blood_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "donation_history_donor_id_fkey"
            columns: ["donor_id"]
            isOneToOne: false
            referencedRelation: "donors"
            referencedColumns: ["id"]
          },
        ]
      }
      donor_request_responses: {
        Row: {
          blood_request_id: string
          donor_id: string
          id: string
          responded_at: string
          response: string
        }
        Insert: {
          blood_request_id: string
          donor_id: string
          id?: string
          responded_at?: string
          response: string
        }
        Update: {
          blood_request_id?: string
          donor_id?: string
          id?: string
          responded_at?: string
          response?: string
        }
        Relationships: [
          {
            foreignKeyName: "donor_request_responses_blood_request_id_fkey"
            columns: ["blood_request_id"]
            isOneToOne: false
            referencedRelation: "blood_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "donor_request_responses_donor_id_fkey"
            columns: ["donor_id"]
            isOneToOne: false
            referencedRelation: "donors"
            referencedColumns: ["id"]
          },
        ]
      }
      donors: {
        Row: {
          area: string | null
          blood_group: string
          city: string
          created_at: string
          id: string
          is_active: boolean
          is_available: boolean
          last_donation_date: string | null
          share_contact: boolean
          total_donations: number
          updated_at: string
          user_id: string
        }
        Insert: {
          area?: string | null
          blood_group: string
          city: string
          created_at?: string
          id?: string
          is_active?: boolean
          is_available?: boolean
          last_donation_date?: string | null
          share_contact?: boolean
          total_donations?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          area?: string | null
          blood_group?: string
          city?: string
          created_at?: string
          id?: string
          is_active?: boolean
          is_available?: boolean
          last_donation_date?: string | null
          share_contact?: boolean
          total_donations?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          area: string | null
          avatar_url: string | null
          city: string | null
          created_at: string
          email: string
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          area?: string | null
          avatar_url?: string | null
          city?: string | null
          created_at?: string
          email: string
          full_name?: string | null
          id: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          area?: string | null
          avatar_url?: string | null
          city?: string | null
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: { _user_id: string }
        Returns: Database["public"]["Enums"]["app_role"]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "donor" | "blood_bank" | "user"
      blood_availability: "available" | "low" | "not_available"
      request_status: "pending" | "accepted" | "fulfilled" | "cancelled"
      verification_status: "pending" | "approved" | "rejected"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "donor", "blood_bank", "user"],
      blood_availability: ["available", "low", "not_available"],
      request_status: ["pending", "accepted", "fulfilled", "cancelled"],
      verification_status: ["pending", "approved", "rejected"],
    },
  },
} as const
