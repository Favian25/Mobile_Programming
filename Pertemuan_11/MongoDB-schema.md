# Booking Collection Schema

**Database Name:** `bkihd`  
**Collection Name:** `booking`

| Field      | Type   | Required | Description                      |
|------------|--------|----------|----------------------------------|
| nama       | String | Yes      | Nama pemesan                     |
| category   | String | Yes      | Jenis kamar (enum)               |
| checkIn    | String | Yes      | Tanggal check-in (format bebas)  |
| checkOut   | String | Yes      | Tanggal check-out (format bebas) |

### Category Options:
- "Standard Room"
- "Basic Room"
- "Family Room"
- "Dormitory"
