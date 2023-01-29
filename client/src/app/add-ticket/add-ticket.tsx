import { useForm } from 'react-hook-form';

import styles from './add-ticket.module.css';

function AddTicket () {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
      <div className={styles["add-ticket"]}>
        <h2>New Ticket</h2>
        <form className="flex" onSubmit={handleSubmit((data) => console.log(data))}>
          <textarea placeholder="Enter description.." className={styles["add-ticket-input"]} {...register('description', { required: true })} />
          {errors['description'] && <p>Please enter description.</p>}
          <input type="submit" />
        </form>
      </div>
  )
};

export default AddTicket;