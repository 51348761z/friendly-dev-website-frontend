import { FORM_SUBMISSION_URL } from "~/config/api";

const ContactPage = () => {
  const FIELD_LABELS: Record<string, string> = {
    name: "Full Name",
    email: "Email",
    subject: "Subject",
    message: "Message",
  };

  return (
    <div className="mx-auto mt-12 max-w-3xl bg-gray-900 px-6 py-8">
      <h2 className="mb-8 text-center text-3xl font-bold text-white">
        Contact Us
      </h2>

      <form action={FORM_SUBMISSION_URL} method="POST" className="space-y-6">
        {Object.entries(FIELD_LABELS).map(([fieldName, label]) => (
          <div key={fieldName}>
            <label
              htmlFor={fieldName}
              className="block text-sm font-medium text-gray-300"
            >
              {label}
            </label>
            {fieldName === "message" ? (
              <textarea
                id={fieldName}
                name={fieldName}
                rows={5}
                className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-gray-100"
              />
            ) : (
              <input
                type={fieldName === "email" ? "email" : "text"}
                id={fieldName}
                name={fieldName}
                className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-gray-100"
              />
            )}
          </div>
        ))}

        <button
          type="submit"
          className="w-full cursor-pointer rounded-lg bg-blue-600 py-2 text-white hover:bg-blue-700"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactPage;
