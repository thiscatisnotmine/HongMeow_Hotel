# remove-duplicate-entities.sh
#!/usr/bin/env bash
set -e

echo "Deleting duplicate per-feature entity folders…"

rm -rf backend/src/booking/entities
rm -rf backend/src/bookedroom/entities
rm -rf backend/src/roomtype/entities
rm -rf backend/src/pet/entities
rm -rf backend/src/payment/entities
rm -rf backend/src/urgent/entities

echo "✅  Duplicate entity folders removed."
