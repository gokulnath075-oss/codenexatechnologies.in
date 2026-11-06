/**
 * ============================================================================
 * CODENEXA TECHNOLOGIES - OFFICIAL GMAIL INTEGRATION WEB APP
 * ============================================================================
 * This script integrates your website forms (Contact & Proposal Request)
 * directly with your official Gmail account (codenexatechnologies26@gmail.com).
 *
 * HOW TO DEPLOY IN 60 SECONDS:
 * 1. Open https://script.google.com while logged into your Google account (codenexatechnologies26@gmail.com).
 * 2. Click "+ New Project" (top left).
 * 3. Delete any default code in the editor, and PASTE THIS ENTIRE FILE.
 * 4. Rename project to "Codenexa Gmail Integration" (top left).
 * 5. Click the blue "Deploy" button (top right) -> Select "New deployment".
 * 6. Click the Gear icon next to "Select type" -> Choose "Web app".
 * 7. In the settings:
 *    - Description: "Codenexa Web Form Mailer"
 *    - Execute as: "Me (codenexatechnologies26@gmail.com)"
 *    - Who has access: "Anyone"  <--- (CRITICAL: Select "Anyone")
 * 8. Click "Deploy".
 * 9. Click "Authorize access", select your account, click "Advanced" -> "Go to Codenexa Gmail Integration (unsafe)" -> Click "Allow".
 * 10. Copy the "Web app URL" (starts with https://script.google.com/macros/s/...)
 * 11. Paste that URL into js/app.js at the line:
 *     const GMAIL_INTEGRATION_URL = 'PASTE_URL_HERE';
 *
 * That's it! Every submission on https://codenexatechnologies.in will now
 * automatically send emails directly through your official Gmail account!
 * ============================================================================
 */

function doPost(e) {
  try {
    var data = {};
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter || {};
      }
    } else {
      data = e.parameter || {};
    }

    var name = (data.name || "Client").trim();
    var phone = (data.phone || "Not Provided").trim();
    var email = (data.email || "").trim();
    var service = (data.service || data.services || data.selected_services || "General Inquiry").trim();
    var message = (data.message || data.scope || data.project_scope || "No additional notes provided").trim();
    var timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

    var targetEmail = "nathgokul325@gmail.com";
    var companyEmail = "codenexatechnologies26@gmail.com";
    var emailSubject = "Official Project Inquiry: " + name + " - " + service + " - Codenexa Technologies";

    var adminBody = 
      "Dear Gokulnath & Codenexa Engineering Team,\n\n" +
      "A new project inquiry has been submitted through codenexatechnologies.in:\n\n" +
      "==================================================\n" +
      "CLIENT CONTACT INFORMATION\n" +
      "==================================================\n" +
      "• Client Name: " + name + "\n" +
      "• Phone / WhatsApp: " + phone + "\n" +
      "• Client Email: " + (email || "Not Provided") + "\n" +
      "• Interested Service / Scope: " + service + "\n\n" +
      "==================================================\n" +
      "PROJECT REQUIREMENTS & DETAILS\n" +
      "==================================================\n" +
      message + "\n\n" +
      "• Submission Time: " + timestamp + " IST\n" +
      "==================================================\n\n" +
      "To reply directly to this client, simply click 'Reply' in your Gmail.";

    // 1. Send notification from codenexatechnologies26@gmail.com to nathgokul325@gmail.com
    var ccList = companyEmail;
    if (email && email.indexOf("@") !== -1 && email !== targetEmail) {
      ccList += "," + email;
    }
    var mailOptions = {
      name: "Codenexa Technologies",
      cc: ccList,
      replyTo: email || companyEmail
    };

    GmailApp.sendEmail(targetEmail, emailSubject, adminBody, mailOptions);

    // 2. Send instant confirmation email to the client
    if (email && email.indexOf("@") !== -1) {
      var clientSubject = "Inquiry Received: Codenexa Technologies";
      var clientBody = 
        "Hello " + name + ",\n\n" +
        "Thank you for contacting Codenexa Technologies!\n\n" +
        "We have successfully received your inquiry regarding \"" + service + "\". Our senior technical architect will review your project requirements and get in touch with you shortly at " + phone + " or " + email + ".\n\n" +
        "==================================================\n" +
        "YOUR INQUIRY SUMMARY\n" +
        "==================================================\n" +
        "• Service: " + service + "\n" +
        "• Phone: " + phone + "\n" +
        "• Requirements: " + message + "\n" +
        "• Submitted: " + timestamp + " IST\n" +
        "==================================================\n\n" +
        "For immediate discussion or urgent inquiries, feel free to chat with us directly on WhatsApp:\n" +
        "📞 WhatsApp: +91 75581 43975\n" +
        "✉ Email: codenexatechnologies26@gmail.com\n\n" +
        "Best regards,\n" +
        "Codenexa Technologies Engineering Team\n" +
        "https://codenexatechnologies.in";

      GmailApp.sendEmail(email, clientSubject, clientBody, {
        name: "Codenexa Technologies",
        replyTo: targetEmail
      });
    }

    // 3. Return JSON response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        result: "success", 
        status: 200, 
        message: "Email sent successfully via Gmail API",
        recipient: targetEmail,
        cc: email
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ 
        result: "error", 
        message: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ 
      status: "active", 
      service: "Codenexa Gmail Integration",
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
