// components/RouteGuard.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { readToken } from '@/lib/authenticate';
import { useAtom } from 'jotai';
import { favouritesAtom, searchHistoryAtom } from '@/store';
import { getFavourites, getHistory } from '@/lib/userData';

// Define which paths are public (no authentication required)
const PUBLIC_PATHS = ['/login', '/register'];

export default function RouteGuard({ children }) {
  const router = useRouter();
  const token = readToken();
  const [ , setFavourites] = useAtom(favouritesAtom);
  const [ , setSearchHistory] = useAtom(searchHistoryAtom);

  useEffect(() => {
    // If the current path is not public and there's no token, redirect to /login
    if (!token && !PUBLIC_PATHS.includes(router.pathname)) {
      router.push('/login');
    } else if (token) {
      // If authenticated, update the atoms with data from the API
      async function updateAtoms() {
        try {
          const favourites = await getFavourites();
          const history = await getHistory();
          setFavourites(favourites);
          setSearchHistory(history);
        } catch (error) {
          console.error("Error updating atoms:", error);
        }
      }
      updateAtoms();
    }
  }, [token, router.pathname, setFavourites, setSearchHistory, router]);

  return children;
}
