function ContactUs() {
    return (
        <div className="flex flex-col md:flex-row justify-between p-8 bg-gray-100">
            <div className="contact-form-section bg-white p-6 rounded-lg shadow-md md:w-1/2 mr-4">
                <h2 className="form-header text-2xl font-bold mb-4">Tell Us What You FEEL.</h2>
                <div className="icon-placeholder flex justify-center mb-4">
                    <div className="green-square h-10 w-10 bg-green-500 rounded-full"></div>
                </div>
                <form className="contact-form space-y-4">
                    <div className="form-group">
                        <label htmlFor="name" className="block text-gray-700">Your Name <span className="required text-red-500">*</span></label>
                        <input type="text" id="name" name="name" required className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email" className="block text-gray-700">Your Email <span className="required text-red-500">*</span></label>
                        <input type="email" id="email" name="email" required className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message" className="block text-gray-700">Your Message</label>
                        <textarea id="message" name="message" rows="4" className="mt-1 block w-full border border-gray-300 rounded-md p-2"></textarea>
                    </div>
                    <button type="submit" className="submit-btn w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600">Send Message</button>
                </form>
            </div>
            <div className="contact-info-section bg-white p-6 rounded-lg shadow-md md:w-1/3 ml-4 mt-6 md:mt-0">
                <h2 className="info-header text-2xl font-bold mb-4">Contact Us</h2>
                <p className="mb-4">
                    We are here to help! Whether you have a question about our services, need assistance with a transaction, 
                    or just want to share your thoughts, we’d love to hear from you. Feel free to reach out, and our team will get back to you as soon as possible. 
                    Your feedback is essential in helping us create the best experience for you. Let's make your journey smoother together!
                </p>
                <div className="contact-details space-y-4">
                    <div className="contact-detail">
                        <strong>📍 Address</strong>
                        <p>Addis Ababa, Ethiopia</p>
                    </div>
                    <div className="contact-detail">
                        <strong>📞 Phone</strong>
                        <p>Mobile: +251-949-61-83-38</p>
                        <p>OR: +251-964-84-66-09</p>
                    </div>
                    <div className="contact-detail">
                        <strong>📧 Email</strong>
                        <p>aklilubeyero@gmail.com</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactUs;
