import { NextResponse } from "next/server"
import { djiData, events } from "@/lib/mock-data"

export async function GET() {
  // In een echte applicatie zou je hier data ophalen van een externe API
  // zoals Alpha Vantage, Yahoo Finance, of Finnhub

  try {
    // Simuleer API delay
    await new Promise((resolve) => setTimeout(resolve, 100))

    return NextResponse.json({
      success: true,
      data: {
        djiData,
        events,
        lastUpdated: new Date().toISOString(),
      },
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch DJI data" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Hier zou je een nieuwe gebeurtenis toevoegen aan je database
    // Voor nu simuleren we dit alleen

    const newEvent = {
      date: body.date,
      title: body.title,
      description: body.description,
      type: body.type,
      impact: body.impact || 0,
    }

    return NextResponse.json({
      success: true,
      message: "Event added successfully",
      event: newEvent,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to add event" }, { status: 500 })
  }
}
