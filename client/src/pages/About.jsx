function AboutUs() {
    return (
        <div className="bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-4xl font-extrabold text-center text-green-600 mb-6">About Us</h2>
                <p className="text-lg text-gray-700 mb-4 text-center">
                    At JobFinder, we believe in connecting talent with opportunity. Our mission is to empower job seekers and employers by providing a user-friendly platform that simplifies the job search process. We strive to create a community where individuals can discover their passions and companies can find the perfect fit for their teams.
                </p>
                <p className="text-lg text-gray-700 mb-8 text-center">
                    With our innovative features and extensive job listings, we are committed to helping you find your dream job or the ideal candidate. Whether you are a recent graduate, a seasoned professional, or an employer looking to grow your team, JobFinder is here to assist you every step of the way.
                </p>

                <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-2xl font-semibold mb-4">Our Values</h3>
                    <ul className="list-disc list-inside text-lg text-gray-700 space-y-2">
                        <li><strong>Integrity:</strong> We uphold the highest standards of honesty and transparency.</li>
                        <li><strong>Innovation:</strong> We embrace creativity and continually improve our platform.</li>
                        <li><strong>Community:</strong> We are dedicated to fostering a supportive environment for job seekers and employers alike.</li>
                    </ul>
                </div>

                <div className="mt-8">
                    <h3 className="text-2xl font-semibold text-center mb-4">Meet Our Team</h3>
                    <p className="text-lg text-gray-700 mb-4 text-center">
                        Our team is made up of passionate professionals with diverse backgrounds in technology, recruitment, and user experience. Together, we work tirelessly to enhance our platform and provide the best experience for our users.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                        {/* Team Member 1 */}
                        <div className="bg-white p-4 rounded-lg shadow-md text-center transition-transform transform hover:scale-105">
                            <h4 className="font-bold text-xl mb-2">Aklilu Beyero</h4>
                            <p className="text-gray-600">Co-Founder & CTO</p>
                        </div>
                        {/* Team Member 2 */}
                        <div className="bg-white p-4 rounded-lg shadow-md text-center transition-transform transform hover:scale-105">
                            <h4 className="font-bold text-xl mb-2">Tekalign Mesfin</h4>
                            <p className="text-gray-600">Co-Founder & CEO</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;
