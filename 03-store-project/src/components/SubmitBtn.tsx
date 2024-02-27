import { useNavigation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
const SubmitBtn = ({ text }: { text: string }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  return (
    <Button type='submit' className='mt-4 w-full' disabled={isSubmitting}>
      {isSubmitting ? 'Submitting...' : text}
    </Button>
  );
};
export default SubmitBtn;
