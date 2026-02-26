

## Unify Favorites and "Interested" System

### Overview
Remove the separate "Mark as Going" button and unify the heart (like) action to serve as both a personal favorite and a public "interested" metric -- similar to Shotgun's model. Liking a party saves it for the user and increments the public interested count.

### Changes

**1. Rename `goingCount` to `interestedCount` in mock data (`src/data/mockData.ts`)**
- Rename the `goingCount` field to `interestedCount` in the `Event` interface and all event objects

**2. Create a favorites store (`src/stores/favoritesStore.ts`)**
- Zustand store tracking liked event IDs as a `Set`
- Actions: `toggleFavorite(eventId)`, `isFavorite(eventId)`
- Derived `interestedBoost`: map of eventId to +1 for liked events (so the displayed count increments when the user likes)

**3. Update EventDetail page (`src/pages/EventDetail.tsx`)**
- Remove the `going` state and the "Marcar como Vou" button entirely
- Connect the heart button to the favorites store (`toggleFavorite` / `isFavorite`)
- Change the info card label from "Confirmados" to "Interessados"
- Display `interestedCount + boost` (where boost is +1 if the user has liked it)

**4. Update EventCard component (`src/components/EventCard.tsx`)**
- Replace all references to `goingCount` with `interestedCount`
- Change the text "vão" (in featured variant) to "interessados"

**5. Update any other references**
- Search for any remaining `goingCount` references across the codebase and update them

### Summary of Label Changes
| Before | After |
|--------|-------|
| `goingCount` | `interestedCount` |
| "Confirmados" | "Interessados" |
| "X vão" | "X interessados" |
| "Marcar como 'Vou'" button | Removed |
| Heart icon = decorative | Heart icon = toggle favorite + increment interested |

