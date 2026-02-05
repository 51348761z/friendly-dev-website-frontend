import { Form } from "react-router";
import type { Route } from "./+types/index";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const subject = formData.get("subject");
  const message = formData.get("message");

  const errors: Record<string, string> = {};
  if (!name) errors.name = "Name is required";
  if (!email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(email.toString())) {
    errors.email = "Email is invalid";
  }
  if (!subject) errors.subject = "Subject is required";
  if (!message) errors.message = "Message is required";

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const data = {
    name,
    email,
    subject,
    message,
  };

  return { message: "Message sent successfully!", data };
}

const ContactPage = ({ actionData }: Route.ComponentProps) => {
  const error = actionData?.errors;
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
      {actionData?.message ? (
        <p className="mb-6 border border-green-500 bg-green-700 p-4 text-center text-green-100 shadow-md">
          {actionData.message}
        </p>
      ) : null}

      <Form method="post" className="space-y-6">
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
            {error && error[fieldName] && (
              <p className="mt-1 text-sm text-red-500">{error[fieldName]}</p>
            )}
          </div>
        ))}

        <button
          type="submit"
          className="w-full cursor-pointer rounded-lg bg-blue-600 py-2 text-white hover:bg-blue-700"
        >
          Send Message
        </button>
      </Form>
    </div>
  );
};

export default ContactPage;
