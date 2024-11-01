import AuthStore from "../store/AuthStore";

const ExpertHomePage = () => {
  const { isEmployer } = AuthStore();
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow flex flex-col items-center justify-center p-8">
        {!isEmployer ? (
          <>
            <h1 className="text-4xl font-bold mb-8">Welcome, Expert!</h1>
            <p className="text-lg leading-relaxed sm:text-xl md:text-2xl max-w-2xl mx-auto p-4 sm:p-6 md:p-8">
              We are glad to have you onboard! This platform empowers experts
              like you to connect with opportunities, manage applications, and
              schedule interviews effortlessly. Explore the features designed to
              streamline your expertise and enhance your professional impact.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-4xl font-bold mb-8">Welcome, Employer!</h1>
            <p className="text-lg leading-relaxed sm:text-xl md:text-2xl max-w-2xl mx-auto p-4 sm:p-6 md:p-8">
              We are glad to have you onboard! This platform empowers employers
              like you to connect with talented applicants, post job openings,
              and manage your hiring process effortlessly. Explore the features
              designed to streamline your recruitment efforts and enhance your
              organizational impact.
            </p>
          </>
        )}

        <div className="flex flex-wrap justify-center gap-8">
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex justify-center">
            <img
              src="../../public/images/expert.webp"
              alt="Illustration 1"
              className="w-full"
            />
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex justify-center">
            <img
              src="../../public/images/expert1.jpg"
              alt="Illustration 2"
              className="w-full"
            />
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex justify-center">
            <img
              src="../../public/images/expert2.jpg"
              alt="Illustration 3"
              className="w-full"
            />
          </div>
        </div>
      </main>
      <footer className="bg-slate-600 text-white p-4 text-center">
        <p>&copy; 2024 Expert Platform. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ExpertHomePage;
