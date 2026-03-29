import Header from '@/components/Header';
import Pin from '@/components/Pin';
import { mockPins } from '@/data/mockData';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="masonry-grid">
          {mockPins.map((pin) => (
            <Pin key={pin.id} pin={pin} />
          ))}
        </div>
      </main>
    </div>
  );
}
