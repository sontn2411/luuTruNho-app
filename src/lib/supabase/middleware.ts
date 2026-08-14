import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (
    !supabaseUrl ||
    !supabaseAnonKey ||
    supabaseUrl.includes('placeholder') ||
    supabaseUrl.includes('your-supabase-project') ||
    supabaseAnonKey.includes('your-supabase-anon-key') ||
    supabaseAnonKey.includes('placeholder')
  ) {
    return supabaseResponse;
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  const isAdminPath = pathname.startsWith('/admin');

  // Các trang yêu cầu phải đăng nhập mới truy cập được
  const isProtectedPath =
    isAdminPath ||
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/bookings') ||
    pathname.startsWith('/rooms') ||
    pathname.startsWith('/guests') ||
    pathname.startsWith('/housekeeping') ||
    pathname.startsWith('/services') ||
    pathname.startsWith('/finance') ||
    pathname.startsWith('/reports') ||
    pathname.startsWith('/settings');

  // Các trang xác thực (login/register)
  const isAuthPath = pathname.startsWith('/login') || pathname.startsWith('/register');

  // 1. Chưa đăng nhập mà vào trang bảo vệ -> Chuyển hướng sang /login
  if (!user && isProtectedPath) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // 2. Kiểm tra riêng cho trang /admin (Chỉ cho phép Admin truy cập)
  if (user && isAdminPath) {
    const superAdminEmail = (process.env.SUPER_ADMIN_EMAIL || 'sontn2411@gmail.com').toLowerCase();
    const isSuperAdminEmail = user.email?.toLowerCase() === superAdminEmail;
    const isMetadataAdmin =
      user.app_metadata?.is_admin === true ||
      user.user_metadata?.is_admin === true;

    let isAdmin = isSuperAdminEmail || isMetadataAdmin;

    // Nếu chưa có trong token metadata -> Kiểm tra bảng profiles
    if (!isAdmin) {
      try {
        const { data: profile } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', user.id)
          .maybeSingle();

        if (profile?.is_admin === true) {
          isAdmin = true;
        }
      } catch {
        // Bỏ qua nếu bảng profiles chưa được tạo
      }
    }

    // Không phải Admin -> Chuyển hướng về /dashboard
    if (!isAdmin) {
      const url = request.nextUrl.clone();
      url.pathname = '/dashboard';
      return NextResponse.redirect(url);
    }
  }

  // 3. Đã đăng nhập mà vào /login hoặc /register -> Chuyển hướng về /dashboard
  if (user && isAuthPath) {
    const url = request.nextUrl.clone();
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

