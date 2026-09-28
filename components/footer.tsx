import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full py-6 border-t border-border mt-auto">
      <div className="container mx-auto px-4 flex justify-between items-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Max. All rights reserved.</p>
        
        {/* Make sure this Link component is present */}
        <Link 
          href="/privacy" 
          className="hover:underline hover:text-foreground transition-colors"
        >
          Privacy Policy
        </Link>
      </div>
    </footer>
  );
}