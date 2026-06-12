export default function ErrorMessage({ children }: { children: React.ReactNode }) {
  return (
    <p className="bg-red-50 text-red-600 text-sm text-center font-semibold rounded-lg p-3 whitespace-pre-line">
      {children}
    </p>
  );
}
