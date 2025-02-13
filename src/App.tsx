import SearchBar from './components/SearchBar/SearchBar';
import { Toaster } from 'react-hot-toast';
import ImageGallery from './components/ImageGallery/ImageGallery';
import { useState } from 'react';
import { searchImages } from './Api/Unsplash';
import ErrorMessage from './components/ErrorMessage/ErrorMessage'; 
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';
import Loader from './components/Loader/Loader';
import { Image } from './types';


 
const App = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [hasMore, setHasMore] = useState(false);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  

  const fetchImages = async (query:string, page:number, reset = false) => {
    setLoading(true);
    setError(null);

    try {
      const data = await searchImages(query, page);
      const newImages = data.results.map((image) => ({
        id: image.id,
          src: image.urls.small,
         fullSrc: image.urls.regular, 
        alt: image.alt_description || 'Image',
      }));

      setImages((prevImages) => (reset ? newImages : [...prevImages, ...newImages]));
      setHasMore(page * 12 < data.total);  
    } catch {
      setError('Error loading images. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (newQuery: string) => {
    if (newQuery === query) return;  
    setQuery(newQuery);
    setPage(1);
    fetchImages(newQuery, 1, true);  
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchImages(query, nextPage);
  };

  const openModal = (image: Image) => setSelectedImage(image);
  const closeModal = () => setSelectedImage(null);

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      <Toaster position="top-right" reverseOrder={false} />
      {loading && !images.length && <Loader />}
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} onImageClick={openModal} />
      {!loading && hasMore && <LoadMoreBtn onClick={handleLoadMore} />}
      {selectedImage && (
        <ImageModal image={selectedImage} onClose={closeModal} />
      )}
    </div>
  );



 }

 export default App
