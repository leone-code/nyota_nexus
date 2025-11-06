import { useForm } from '@inertiajs/react';

export default function Register() {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const submit = (e) => {
    e.preventDefault();
    post(route('register'));
  };

  return (
    <form onSubmit={submit}>
      <div>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={data.name}
          onChange={(e) => setData('name', e.target.value)}
        />
        {errors.name && <div>{errors.name}</div>}
      </div>

      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={data.email}
          onChange={(e) => setData('email', e.target.value)}
        />
        {errors.email && <div>{errors.email}</div>}
      </div>

      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={data.password}
          onChange={(e) => setData('password', e.target.value)}
        />
      </div>

      <div>
        <label>Confirm Password</label>
        <input
          type="password"
          name="password_confirmation"
          value={data.password_confirmation}
          onChange={(e) => setData('password_confirmation', e.target.value)}
        />
      </div>

      <button type="submit" disabled={processing}>
        Register
      </button>
    </form>
  );
}
