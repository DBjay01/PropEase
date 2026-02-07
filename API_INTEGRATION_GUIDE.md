# Property View API Integration Guide

## Overview
This document describes the integration of the Property View API endpoints into the BuyerDashboard and PropertyDetailsPage components.

## API Endpoints Used

### 1. Track Property View
- **Endpoint**: `POST /api/properties/view`
- **Description**: Records when a property is viewed by a buyer
- **Request Body**:
```json
{
  "propertyId": 123,
  "buyerId": 456,
  "viewDate": "2025-02-06T10:30:00.000Z"
}
```
- **Response**: String with message and saved view ID
- **Usage**: Called when a buyer views a property detail page

### 2. Get Property Views
- **Endpoint**: `GET /api/properties/{propertyId}/views`
- **Description**: Retrieves all views for a specific property
- **Response**:
```json
[
  {
    "id": 1,
    "propertyId": 123,
    "buyerId": 456,
    "viewDate": "2025-02-06T10:30:00.000Z"
  }
]
```

### 3. Get Views Count for Seller
- **Endpoint**: `GET /api/properties/sellers/{sellerId}/viewsCount`
- **Description**: Gets aggregated view counts for all properties of a seller
- **Response**:
```json
[
  {
    "propertyId": 123,
    "viewCount": 15
  },
  {
    "propertyId": 124,
    "viewCount": 8
  }
]
```

## Integration Points

### BuyerDashboard Component
**Location**: `src/pages/BuyerDashboard/BuyerDashboard.jsx`

**Implemented Features**:
1. **User Identification**: Extracts `userId` from localStorage on component mount
2. **Saved Properties Tracking**: Fetches saved properties and displays count in stats
3. **View Tracking**: Automatically tracks views for each saved property
4. **View Count Aggregation**: Fetches total property views from the seller's endpoint

**Key State Variables**:
- `userId`: Current user's ID
- `savedProperties`: Array of saved properties
- `totalViewCount`: Total views across all user's properties
- `savedPropertiesCount`: Number of saved properties

**Effects**:
1. Extract user ID from localStorage
2. Fetch saved properties when userId is available
3. Track views for saved properties when they load
4. Fetch and aggregate view counts

### PropertyDetailsPage Component
**Location**: `src/pages/PropertyDetailsPage/PropertyDetailsPage.jsx`

**Implemented Features**:
1. **Automatic View Tracking**: When a property is loaded, the view is automatically tracked
2. **Error Handling**: View tracking errors are logged but don't disrupt user experience

**Key Function**:
```javascript
const trackPropertyView = async (propertyData) => {
  // Extracts user ID from localStorage
  // Creates view request with propertyId, buyerId, and viewDate
  // Sends POST request to /api/properties/view endpoint
};
```

## Authentication
All API calls use the `fetchWithAuth` utility function which:
- Automatically attaches JWT token from localStorage
- Handles 401 unauthorized responses
- Redirects to login if token is invalid

## Error Handling
- **BuyerDashboard**: Logs errors to console, doesn't affect UI
- **PropertyDetailsPage**: Silently logs view tracking errors, doesn't show alerts

## User ID Extraction
The components support multiple user ID field names:
- `user?.id`
- `user?.userId`
- `user?.user_id`

This ensures compatibility with different backend implementations.

## Stats Display
The BuyerDashboard displays:
- **Saved Properties**: Count of user's liked properties
- **Property Views**: Total views of user's properties (if user is a seller)

## Future Enhancements
1. Real-time view count updates using WebSockets
2. View analytics dashboard for sellers
3. View history with timestamps
4. View rate tracking (views per day)
5. Most viewed properties ranking
