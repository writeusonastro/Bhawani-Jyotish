import React from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<Props, State> {
  override state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error', error, errorInfo);
  }

  public override render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FFFDF9] flex items-center justify-center p-6 text-center font-sans">
          <div className="max-w-md bg-white p-8 rounded-2xl border border-orange-200 shadow-xl space-y-4">
            <h2 className="text-2xl font-bold text-orange-700">🚩 भवानी ज्योतिष केंद्र</h2>
            <p className="text-sm text-gray-600">
              पृष्ठ लोड करने में कोई समस्या आई है। कृपया नीचे दिए गए बटन पर क्लिक करके पुनः प्रयास करें।
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2.5 px-6 rounded-xl text-sm transition-all"
            >
              🔄 पेज रीलोड करें (Reload)
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
