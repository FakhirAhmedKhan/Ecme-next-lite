import { useState, useEffect } from "react"
import { Mail, ChevronDown, Check } from "lucide-react"

export const SmartEmailButton = ({ email }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedApp, setSelectedApp] = useState("auto") // auto | gmail | outlook | mailto

  useEffect(() => {
    const saved = localStorage.getItem("preferredEmailApp")
    if (saved) setSelectedApp(saved)
  }, [])

  const openEmail = (service: string) => {
    const to = email
    const subject = "Invoice Details"
    const body = "Hello,\n\nPlease find the invoice attached.\n\nBest regards,"

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      to
    )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    const outlookUrl = `https://outlook.office.com/mail/deeplink/compose?to=${encodeURIComponent(
      to
    )}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    const mailtoUrl = `mailto:${to}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`

    switch (service) {
      case "gmail":
        window.open(gmailUrl, "_blank")
        break
      case "outlook":
        window.open(outlookUrl, "_blank")
        break
      case "mailto":
        window.open(mailtoUrl, "_blank")
        break
      case "auto":
      default:
        // Try detecting login automatically
        const isGmail =
          document.cookie.includes("G_AUTHUSER") ||
          window.location.hostname.includes("google")
        const isOutlook =
          document.cookie.includes("ESTSAUTH") ||
          window.location.hostname.includes("office") ||
          window.location.hostname.includes("outlook")

        if (isGmail) window.open(gmailUrl, "_blank")
        else if (isOutlook) window.open(outlookUrl, "_blank")
        else window.open(mailtoUrl, "_blank")
        break
    }
  }

  const handleSelect = (service: string) => {
    setSelectedApp(service)
    localStorage.setItem("preferredEmailApp", service)
    setIsOpen(false)
  }

  return (
    <div className="relative inline-block">
      <button
        onClick={(e) => {
          e.stopPropagation()
          openEmail(selectedApp)
        }}
        title="Send Email"
        className="flex items-center gap-1 p-3 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
      >
        <Mail className="w-5 h-5" />
        <ChevronDown
          className="w-4 h-4 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation()
            setIsOpen((prev) => !prev)
          }}
        />
      </button>

      {isOpen && (
        <div className="relative right-0 mt-2 w-40 rounded-lg shadow-lg bg-white border border-gray-200 z-50">
          {[
            { key: "auto", label: "Auto Detect" },
            { key: "gmail", label: "Gmail" },
            { key: "outlook", label: "Outlook" },
            { key: "mailto", label: "Default App" },
          ].map((opt) => (
            <button
              key={opt.key}
              onClick={() => handleSelect(opt.key)}
              className={`flex items-center justify-between w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${selectedApp === opt.key ? "font-medium text-blue-600" : ""
                }`}
            >
              {opt.label}
              {selectedApp === opt.key && <Check className="w-4 h-4" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
