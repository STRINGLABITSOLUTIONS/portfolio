import { useState } from 'react';
import { AiFillPicture } from 'react-icons/ai';
import useFetch from '../../../../hooks/useFetch';

export default function LogoClouds() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const { isLoading, data, error } = useFetch('data/logos.json');

  isLoading && <div>Loading...</div>;

  error && <div>Error: {error.message}</div>;

  (!data || !data?.length) && <div>No data found</div>;

  function handleCheckboxChange(event) {
    const value = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedItems([...selectedItems, value]);
    } else {
      setSelectedItems(selectedItems.filter((item) => item !== value));
    }
  }
  return (
    <div className='bg-gray-600 p-2'>
      <div className='flex items-center justify-between'>
        <h1 className='flex items-center gap-3'>
          <AiFillPicture />
          Logo Clouds
        </h1>
        <div className='relative inline-block'>
          <button
            className='py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75'
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-haspopup='true'>
            Select Logos
          </button>
          {isOpen && data?.length > 0 && (
            <div className='absolute z-10 top-10 right-0 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5'>
              {data?.map(({ value, name }) => (
                <label
                  key={value}
                  className='block py-2 px-4 text-sm text-gray-700 cursor-pointer'>
                  <input
                    type='checkbox'
                    name='options'
                    value={value ?? 'no-value'}
                    checked={selectedItems.includes(value ?? 'no-value')}
                    onChange={handleCheckboxChange}
                  />
                  {name ?? 'No Title'}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className='p-2'>
        {data
          ?.filter(({ value }) => selectedItems.includes(value))
          ?.map(({ id, name, link }) => (
            <div key={id} className='bg-gray-500 mt-3 p-2 rounded-lg'>
              <h1>{name ?? 'No name'}</h1>
              <img 
                className='h-10 grayscale hover:grayscale-0 flex place-items-end'
                src={link} 
                alt="" />
            </div>
          ))}
      </div>
    </div>
  );
}
