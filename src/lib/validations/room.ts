import { z } from "zod";

export const createRoomSchema = z.object({
  name: z.string().min(1, "Tên phòng không được để trống"),
  type: z.string().min(1, "Vui lòng chọn loại phòng"),
  pricePerNight: z.number().min(1, "Giá phòng phải lớn hơn 0"),
  status: z.enum(["available", "occupied", "dirty", "maintenance"], {
    message: "Trạng thái không hợp lệ",
  }),
  description: z.string().optional(),
});

export type CreateRoomFormData = z.infer<typeof createRoomSchema>;
