import { useForm } from 'react-hook-form';

import styles from './add-ticket.module.css';
import { useAddTicketMutation } from '../services/ticketsApi';

function AddTicket () {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [addTicket, { isLoading }] = useAddTicketMutation()

  function handleAddTicket(data:any):void{
    addTicket(data);
    reset();
  }

  return (
      <div className={styles['add-ticket']}>
        <h2>New Ticket</h2>
        <form className="flex" onSubmit={handleSubmit(handleAddTicket)}>
          <textarea
            placeholder="Enter description.."
            className={styles['add-ticket-input']}
            {...register('description', { required: true })}
          />
          {errors['description'] && <p>Please enter description.</p>}
          <input type="submit" disabled={isLoading} />
        </form>
      </div>
  )
};

export default AddTicket;