import React, { useState, useRef } from "react";

// This is an example component showing different ways to handle form inputs in React
const FormStateExample: React.FC = () => {
  // ---------- Controlled Inputs (React State) ----------
  // State declarations - each input that we want to control needs its own state
  const [displayName, setDisplayName] = useState(""); // String state
  const [age, setAge] = useState(0); // Number state
  const [isStudent, setIsStudent] = useState(false); // Boolean state
  const [favoriteColor, setFavoriteColor] = useState<"red" | "blue" | "green">(
    "red"
  ); // Union type state

  // ---------- Uncontrolled Inputs (Direct DOM access) ----------
  // Refs are used for uncontrolled inputs when you only need the value on submit
  const bioRef = useRef<HTMLTextAreaElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  // Example of a form submission handler using both controlled and uncontrolled inputs
  const handleSubmit = async () => {
    // ---------- RIGHT WAY (Controlled Inputs) ----------
    console.log("Display Name:", displayName); // ✅ Use state directly
    console.log("Age:", age); // ✅ Use state directly
    console.log("Is Student:", isStudent); // ✅ Use state directly
    console.log("Favorite Color:", favoriteColor); // ✅ Use state directly

    // ---------- WRONG WAY (Don't do this with controlled inputs) ----------
    // ❌ Don't do this - redundant DOM access for controlled inputs
    const wrongWayName = document.getElementById("display-name")?.value;

    // ---------- Acceptable way for uncontrolled inputs ----------
    // ✅ Using refs for uncontrolled inputs is fine
    const bio = bioRef.current?.value || "";
    const email = emailRef.current?.value || "";

    // Example API call (similar to your Supabase call)
    try {
      // Simulated API call
      const response = await fakeApiCall({
        displayName, // Using state directly
        age, // Using state directly
        isStudent, // Using state directly
        bio, // Using ref value
        email, // Using ref value
      });

      console.log("Success:", response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h2>Form State Examples</h2>

      {/* ---------- Controlled Inputs Example ---------- */}
      <section>
        <h3>Controlled Inputs (Using React State)</h3>

        {/* Text Input */}
        <div>
          <label htmlFor="display-name">Display Name:</label>
          <input
            type="text"
            id="display-name"
            value={displayName} // ✅ Value from state
            onChange={(e) => setDisplayName(e.target.value)} // ✅ Update state on change
          />
        </div>

        {/* Number Input */}
        <div>
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
          />
        </div>

        {/* Checkbox Input */}
        <div>
          <label htmlFor="is-student">Is Student:</label>
          <input
            type="checkbox"
            id="is-student"
            checked={isStudent}
            onChange={(e) => setIsStudent(e.target.checked)}
          />
        </div>

        {/* Radio Inputs */}
        <div>
          <p>Favorite Color:</p>
          <label>
            <input
              type="radio"
              name="color"
              value="red"
              checked={favoriteColor === "red"}
              onChange={(e) => setFavoriteColor("red")}
            />
            Red
          </label>
          <label>
            <input
              type="radio"
              name="color"
              value="blue"
              checked={favoriteColor === "blue"}
              onChange={(e) => setFavoriteColor("blue")}
            />
            Blue
          </label>
          <label>
            <input
              type="radio"
              name="color"
              value="green"
              checked={favoriteColor === "green"}
              onChange={(e) => setFavoriteColor("green")}
            />
            Green
          </label>
        </div>
      </section>

      {/* ---------- Uncontrolled Inputs Example ---------- */}
      <section>
        <h3>Uncontrolled Inputs (Using Refs)</h3>

        <div>
          <label htmlFor="bio">Bio:</label>
          <textarea
            id="bio"
            ref={bioRef} // ✅ Using ref instead of state
            defaultValue="" // Optional default value
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            ref={emailRef} // ✅ Using ref instead of state
            defaultValue="" // Optional default value
          />
        </div>
      </section>

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

// Fake API call for the example
const fakeApiCall = async (data: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, data });
    }, 1000);
  });
};

export default FormStateExample;
