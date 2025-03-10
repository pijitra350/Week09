
import { json } from "@remix-run/node";


import { type LoaderFunction } from "@remix-run/node";


import { books } from "~/utils/books";

// ประกาศฟังก์ชัน loader ที่เป็น async function ซึ่งใช้ในการโหลดข้อมูลหนังสือเฉพาะตัวตาม bookId ที่ส่งมาใน params
export const loader: LoaderFunction = async ({ params }) => {
  // ดึงค่า bookId จาก params
  const { bookId } = params;

  // ค้นหาหนังสือในอาร์เรย์ books โดยใช้ bookId ที่ตรงกับตัวแปร bookId ที่ส่งมา
  const book = books.find((b) => b.bookId === bookId);

  // ถ้าหากไม่พบหนังสือที่ตรงกับ bookId, คืนค่าข้อความ error พร้อมสถานะ HTTP 404 (ไม่พบ)
  if (!book) {
    return json({ error: "Book not found" }, { status: 404 });
  }

  // ถ้าพบหนังสือที่ตรงกับ bookId, คืนค่าข้อมูลของหนังสือในรูปแบบ JSON
  return json(book);
};
