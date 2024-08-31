const Cancel = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-base-100 text-base-content">
      <div className="p-10 text-center rounded-lg shadow-lg bg-base-200">
        <h1 className="mb-4 text-4xl font-bold">Payment Canceled</h1>
        <p className="text-lg">
          Your payment has been canceled. Please try again or contact support if
          you have any questions.
        </p>
      </div>
    </div>
  );
};

export default Cancel;
