(function () {
  "use strict";

  /* ==========================================================================
     Mock data — everything here lives only in memory for this demo session.
     ========================================================================== */
  const CENTER_NAME = "Kick Off Marrakech";

  const CONTACT = {
    reception: "212524492949",
    footballWA: "212653535498",
    padelWA: "212661274274",
  };

  const PITCH_OPTIONS = {
    football: {
      "5v5": ["Terrain 5v5 A", "Terrain 5v5 B"],
      "7v7": ["Terrain 7v7"],
    },
    padel: {
      "1v1": ["Court Padel 1", "Court Padel 2"],
      "2v2": ["Court Padel 1", "Court Padel 2"],
    },
  };

  const footballSlots = [
    { time: "18:00", pitch: "Terrain 5v5 A", subType: "5v5", status: "available" },
    { time: "19:00", pitch: "Terrain 7v7", subType: "7v7", status: "almost-full" },
    { time: "20:00", pitch: "Terrain 5v5 B", subType: "5v5", status: "open-match" },
    { time: "21:00", pitch: "Terrain 5v5 A", subType: "5v5", status: "reserved" },
    { time: "22:00", pitch: "Terrain 7v7", subType: "7v7", status: "available" },
  ];

  const padelSlots = [
    { time: "18:30", pitch: "Court Padel 1", subType: "2v2", status: "available" },
    { time: "19:30", pitch: "Court Padel 2", subType: "2v2", status: "open-match" },
    { time: "20:30", pitch: "Court Padel 1", subType: "2v2", status: "reserved" },
    { time: "21:30", pitch: "Court Padel 2", subType: "2v2", status: "available" },
  ];

  const statusLabels = {
    "available": "Available",
    "almost-full": "Almost full",
    "open-match": "Open match",
    "reserved": "Reserved",
  };

  let matchIdSeq = 1;
  const openMatches = [
    { id: matchIdSeq++, sport: "football", format: "Football 5v5", when: "Tonight", time: "20:00", level: "Intermediate", joined: 7, total: 10 },
    { id: matchIdSeq++, sport: "football", format: "Football 7v7", when: "Tonight", time: "22:00", level: "Beginner friendly", joined: 10, total: 14 },
    { id: matchIdSeq++, sport: "padel", format: "Padel 2v2", when: "Tomorrow", time: "19:30", level: "Intermediate", joined: 3, total: 4 },
  ];

  const scheduleRows = [
    { id: 1, time: "08:00", label: "Academy", status: "confirmed", type: "Academy", players: null, price: null },
    { id: 2, time: "18:00", label: "Football 5v5 A", status: "confirmed", type: "Private", players: null, price: 400 },
    { id: 3, time: "19:00", label: "Football 7v7", status: "pending", type: "Open match", players: "10/14", price: 600 },
    { id: 4, time: "20:00", label: "Football 5v5 B", status: "open-match", type: "Open match", players: "7/10", price: 400 },
    { id: 5, time: "20:30", label: "Padel Court 1", status: "confirmed", type: "2v2", players: null, price: 300 },
    { id: 6, time: "21:00", label: "Football 5v5 A", status: "reserved", type: "Private", players: null, price: 400 },
    { id: 7, time: "22:00", label: "Football 7v7", status: "open-match", type: "Open match", players: "10/14", price: 600 },
  ];

  const players = [
    { name: "Yassine Berrada", sport: "Football", level: "Intermediate", lastPlayed: "2 days ago", bookings: 14, phone: "212600000101" },
    { name: "Amine Tazi", sport: "Football", level: "Advanced", lastPlayed: "Yesterday", bookings: 22, phone: "212600000102" },
    { name: "Mehdi Slaoui", sport: "Padel", level: "Beginner", lastPlayed: "5 days ago", bookings: 5, phone: "212600000103" },
    { name: "Hamza Idrissi", sport: "Football", level: "Intermediate", lastPlayed: "Today", bookings: 18, phone: "212600000104" },
    { name: "Adam El Fassi", sport: "Padel", level: "Advanced", lastPlayed: "3 days ago", bookings: 12, phone: "212600000105" },
    { name: "Sofia Amrani", sport: "Football", level: "Intermediate", lastPlayed: "4 days ago", bookings: 9, phone: "212600000106" },
    { name: "Lina Bennis", sport: "Padel", level: "Beginner", lastPlayed: "Today", bookings: 7, phone: "212600000107" },
  ];

  const stats = {
    bookingsToday: 18,
    pending: 5,
    openMatches: 6,
    cash: 4800,
    occupancy: 82,
    playersNeeded: 11,
  };

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ==========================================================================
     Helpers
     ========================================================================== */
  function el(tag, className, html) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (html !== undefined) node.innerHTML = html;
    return node;
  }

  function waLink(phone, message) {
    return "https://wa.me/" + phone + "?text=" + encodeURIComponent(message);
  }

  function formatCash(amount) {
    return amount.toLocaleString("en-US") + " MAD";
  }

  function scrollToId(id) {
    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
  }

  function needsFromPlayers(playersStr) {
    if (!playersStr) return 0;
    const parts = playersStr.split("/").map(Number);
    return Math.max(0, parts[1] - parts[0]);
  }

  /* ==========================================================================
     Navigation
     ========================================================================== */
  function initNav() {
    const toggle = document.getElementById("navToggle");
    const nav = document.getElementById("primaryNav");

    toggle.addEventListener("click", function () {
      const isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener("click", function (e) {
        const id = link.getAttribute("href").slice(1);
        if (!id || !document.getElementById(id)) return;
        e.preventDefault();
        scrollToId(id);
      });
    });
  }

  /* ==========================================================================
     Availability tabs + slots
     ========================================================================== */
  function renderSlotList(listEl, slots) {
    listEl.innerHTML = "";
    slots.forEach(function (slot) {
      const li = el("li");
      const btn = el("button", "slot-item");
      btn.type = "button";
      const isReserved = slot.status === "reserved";
      if (isReserved) btn.disabled = true;
      btn.setAttribute("aria-label", slot.time + " on " + slot.pitch + ", " + statusLabels[slot.status]);

      btn.innerHTML =
        '<span class="slot-time">' + slot.time + '</span>' +
        '<span class="slot-pitch">' + slot.pitch + '</span>' +
        '<span class="slot-status status-' + slot.status + '">' + statusLabels[slot.status] + '</span>';

      btn.addEventListener("click", function () {
        if (isReserved) return;
        prefillBooking(slot);
      });

      li.appendChild(btn);
      listEl.appendChild(li);
    });
  }

  function renderSlots() {
    renderSlotList(document.getElementById("footballSlotsList"), footballSlots);
    renderSlotList(document.getElementById("padelSlotsList"), padelSlots);
  }

  function initTabs() {
    const tabFootball = document.getElementById("tabFootball");
    const tabPadel = document.getElementById("tabPadel");
    const panelFootball = document.getElementById("panelFootball");
    const panelPadel = document.getElementById("panelPadel");

    function activate(sport) {
      const isFootball = sport === "football";
      tabFootball.classList.toggle("is-active", isFootball);
      tabPadel.classList.toggle("is-active", !isFootball);
      tabFootball.setAttribute("aria-selected", String(isFootball));
      tabPadel.setAttribute("aria-selected", String(!isFootball));
      panelFootball.hidden = !isFootball;
      panelPadel.hidden = isFootball;
    }

    tabFootball.addEventListener("click", function () { activate("football"); });
    tabPadel.addEventListener("click", function () { activate("padel"); });
  }

  function prefillBooking(slot) {
    const sport = footballSlots.includes(slot) ? "football" : "padel";
    const sportSelect = document.getElementById("bookSport");
    sportSelect.value = sport;
    updateSportFields();

    if (sport === "football") {
      document.getElementById("pitchType").value = slot.subType;
    } else {
      document.getElementById("padelType").value = slot.subType;
    }
    updatePitchOptions();
    document.getElementById("pitchCourt").value = slot.pitch;
    document.getElementById("bookTime").value = slot.time;

    if (slot.status === "open-match") {
      document.getElementById("bookingType").value = "open";
      toggleOpenMatchFields();
    }

    scrollToId("book");
    const dateInput = document.getElementById("bookDate");
    if (dateInput) dateInput.focus();
  }

  /* ==========================================================================
     Booking form
     ========================================================================== */
  function updateSportFields() {
    const sport = document.getElementById("bookSport").value;
    document.getElementById("footballTypeField").hidden = sport !== "football";
    document.getElementById("padelTypeField").hidden = sport !== "padel";
    updatePitchOptions();
  }

  function updatePitchOptions() {
    const sport = document.getElementById("bookSport").value;
    const subType = sport === "football"
      ? document.getElementById("pitchType").value
      : document.getElementById("padelType").value;

    const select = document.getElementById("pitchCourt");
    const options = (PITCH_OPTIONS[sport] && PITCH_OPTIONS[sport][subType]) || [];
    select.innerHTML = options.map(function (opt) {
      return '<option value="' + opt + '">' + opt + "</option>";
    }).join("");
  }

  function toggleOpenMatchFields() {
    const bookingType = document.getElementById("bookingType");
    const fields = document.getElementById("openMatchFields");
    fields.hidden = bookingType.value !== "open";
  }

  function initBookingForm() {
    const form = document.getElementById("bookingForm");
    const success = document.getElementById("bookingSuccess");
    const summary = document.getElementById("bookingSummary");
    const bookSport = document.getElementById("bookSport");
    const pitchType = document.getElementById("pitchType");
    const padelType = document.getElementById("padelType");
    const bookingType = document.getElementById("bookingType");
    const againBtn = document.getElementById("bookingAgainBtn");

    bookSport.addEventListener("change", updateSportFields);
    pitchType.addEventListener("change", updatePitchOptions);
    padelType.addEventListener("change", updatePitchOptions);
    bookingType.addEventListener("change", toggleOpenMatchFields);

    updateSportFields();

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const data = new FormData(form);
      const sport = data.get("bookSport");
      const isOpen = data.get("bookingType") === "open";
      const subType = sport === "football" ? data.get("pitchType") : data.get("padelType");

      let lines = [
        "Sport: " + (sport === "football" ? "Football" : "Padel") + " (" + subType + ")",
        "Date: " + (data.get("bookDate") || "—"),
        "Time: " + data.get("bookTime"),
        "Pitch / court: " + data.get("pitchCourt"),
        "Booking type: " + (isOpen ? "Open match" : "Private booking"),
      ];

      if (isOpen) {
        lines.push("Level: " + data.get("matchLevel"));
        lines.push("Players confirmed: " + data.get("playersConfirmed"));
        lines.push("Players needed: " + data.get("playersNeeded"));
      }

      lines.push("Name: " + data.get("playerName"));
      lines.push("Phone: " + data.get("playerPhone"));
      if (data.get("playerNotes")) lines.push("Notes: " + data.get("playerNotes"));

      summary.textContent = lines.join("\n");
      form.hidden = true;
      success.hidden = false;
      success.focus({ preventScroll: true });
    });

    againBtn.addEventListener("click", function () {
      resetBookingForm();
    });
  }

  function resetBookingForm() {
    const form = document.getElementById("bookingForm");
    const success = document.getElementById("bookingSuccess");
    form.reset();
    updateSportFields();
    toggleOpenMatchFields();
    form.hidden = false;
    success.hidden = true;
  }

  /* ==========================================================================
     Open matches
     ========================================================================== */
  function renderMatches() {
    const grid = document.getElementById("matchesGrid");
    grid.innerHTML = "";

    openMatches.forEach(function (match) {
      const needed = match.total - match.joined;
      const isFull = needed <= 0;
      const pct = Math.round((match.joined / match.total) * 100);
      const iconId = match.sport === "padel" ? "icon-padel" : "icon-ball";
      const waNumber = match.sport === "padel" ? CONTACT.padelWA : CONTACT.footballWA;

      const card = el("article", "match-card");
      card.innerHTML =
        '<div class="match-top">' +
          '<span class="match-when">' + match.when + " " + match.time + '</span>' +
          '<span class="match-level">' + match.level + '</span>' +
        '</div>' +
        '<p class="match-format"><svg class="icon"><use href="#' + iconId + '"></use></svg> ' + match.format + '</p>' +
        '<div class="match-progress-track"><div class="match-progress-fill" style="width:' + pct + '%"></div></div>' +
        '<div class="match-meta">' +
          '<span>' + match.joined + '/' + match.total + ' players</span>' +
          '<span class="match-needed"><strong>' + (isFull ? 0 : needed) + '</strong> needed</span>' +
        '</div>' +
        '<div class="match-actions"></div>';

      const actions = card.querySelector(".match-actions");

      const joinBtn = el("button", "btn btn-primary");
      joinBtn.type = "button";
      joinBtn.textContent = isFull ? "Match full" : "Join match";
      if (isFull) joinBtn.disabled = true;
      joinBtn.addEventListener("click", function () {
        if (match.joined >= match.total) return;
        match.joined += 1;
        renderMatches();
      });

      const waBtn = el("a", "btn btn-whatsapp");
      waBtn.innerHTML = '<svg class="icon"><use href="#icon-whatsapp"></use></svg> Invite on WhatsApp';
      const message = "Hey! Join me for " + match.format + " " + match.when.toLowerCase() + " at " + match.time +
        " at " + CENTER_NAME + ". We need " + (isFull ? 0 : needed) + " more players. Level: " + match.level + ".";
      waBtn.href = waLink(waNumber, message);
      waBtn.target = "_blank";
      waBtn.rel = "noopener noreferrer";

      actions.appendChild(joinBtn);
      actions.appendChild(waBtn);
      grid.appendChild(card);

      if (match.id === openMatches[0].id) updateHeroPreview(match);
    });
  }

  function updateHeroPreview(match) {
    const needed = Math.max(0, match.total - match.joined);
    const pct = Math.round((match.joined / match.total) * 100);
    document.getElementById("heroPreviewTitle").textContent = match.format;
    document.getElementById("heroPreviewTime").textContent = match.time;
    document.getElementById("heroPreviewJoined").textContent = match.joined;
    document.getElementById("heroPreviewTotal").textContent = match.total;
    document.getElementById("heroPreviewNeeded").textContent = needed;
    document.getElementById("heroPreviewFill").style.width = pct + "%";
  }

  /* ==========================================================================
     Dashboard — stats
     ========================================================================== */
  function renderStats() {
    document.getElementById("statBookings").textContent = stats.bookingsToday;
    document.getElementById("statPending").textContent = stats.pending;
    document.getElementById("statOpenMatches").textContent = stats.openMatches;
    document.getElementById("statCash").textContent = formatCash(stats.cash);
    document.getElementById("statOccupancy").textContent = stats.occupancy + "%";
    document.getElementById("statPlayersNeeded").textContent = stats.playersNeeded;
  }

  const statusBadgeClass = {
    confirmed: "badge-confirmed",
    pending: "badge-pending",
    "open-match": "badge-open-match",
    reserved: "badge-reserved",
    cancelled: "badge-cancelled",
  };
  const statusBadgeLabel = {
    confirmed: "Confirmed",
    pending: "Pending",
    "open-match": "Open match",
    reserved: "Reserved",
    cancelled: "Cancelled",
  };

  function waNumberForRow(row) {
    if (row.label.toLowerCase().indexOf("padel") !== -1) return CONTACT.padelWA;
    if (row.label === "Academy") return CONTACT.reception;
    return CONTACT.footballWA;
  }

  function renderSchedule() {
    const body = document.getElementById("scheduleBody");
    body.innerHTML = "";

    scheduleRows.forEach(function (row) {
      const tr = el("tr");
      const typeLabel = row.players ? row.type + " · " + row.players : row.type;
      const priceLabel = row.price ? row.price + " MAD" : "—";

      tr.innerHTML =
        "<td>" + row.time + "</td>" +
        "<td>" + row.label + "</td>" +
        '<td><span class="status-badge ' + statusBadgeClass[row.status] + '">' + statusBadgeLabel[row.status] + "</span></td>" +
        "<td>" + typeLabel + "</td>" +
        "<td>" + priceLabel + "</td>";

      const actionsTd = el("td");
      const actionsWrap = el("div", "row-actions");

      const confirmBtn = el("button", "btn btn-small btn-secondary");
      confirmBtn.type = "button";
      confirmBtn.textContent = "Confirm";
      confirmBtn.disabled = row.status === "confirmed" || row.status === "cancelled";
      confirmBtn.addEventListener("click", function () { confirmRow(row.id); });

      const cancelBtn = el("button", "btn btn-small btn-danger");
      cancelBtn.type = "button";
      cancelBtn.textContent = "Cancel";
      cancelBtn.disabled = row.status === "cancelled";
      cancelBtn.addEventListener("click", function () { cancelRow(row.id); });

      const waBtn = el("a", "btn btn-small btn-whatsapp");
      waBtn.textContent = "WhatsApp";
      const message = "Hi! This is " + CENTER_NAME + " confirming your booking at " + row.time +
        " for " + row.label + " (" + row.type + "). See you soon — payment is cash at the center.";
      waBtn.href = waLink(waNumberForRow(row), message);
      waBtn.target = "_blank";
      waBtn.rel = "noopener noreferrer";

      actionsWrap.appendChild(confirmBtn);
      actionsWrap.appendChild(cancelBtn);
      actionsWrap.appendChild(waBtn);
      actionsTd.appendChild(actionsWrap);
      tr.appendChild(actionsTd);

      body.appendChild(tr);
    });
  }

  function confirmRow(id) {
    const row = scheduleRows.find(function (r) { return r.id === id; });
    if (!row || row.status === "confirmed" || row.status === "cancelled") return;

    if (row.status === "pending") {
      stats.pending = Math.max(0, stats.pending - 1);
    } else if (row.status === "open-match") {
      stats.openMatches = Math.max(0, stats.openMatches - 1);
      stats.playersNeeded = Math.max(0, stats.playersNeeded - needsFromPlayers(row.players));
    }

    row.status = "confirmed";
    renderSchedule();
    renderStats();
  }

  function cancelRow(id) {
    const row = scheduleRows.find(function (r) { return r.id === id; });
    if (!row || row.status === "cancelled") return;

    if (row.status === "pending") stats.pending = Math.max(0, stats.pending - 1);
    if (row.status === "open-match") {
      stats.openMatches = Math.max(0, stats.openMatches - 1);
      stats.playersNeeded = Math.max(0, stats.playersNeeded - needsFromPlayers(row.players));
    }

    stats.bookingsToday = Math.max(0, stats.bookingsToday - 1);
    if (row.price) stats.cash = Math.max(0, stats.cash - row.price);
    stats.occupancy = Math.max(0, stats.occupancy - 2);

    row.status = "cancelled";
    renderSchedule();
    renderStats();
  }

  /* ==========================================================================
     Player database
     ========================================================================== */
  function renderPlayers() {
    const body = document.getElementById("playersBody");
    body.innerHTML = "";

    players.forEach(function (player) {
      const tr = el("tr");
      tr.innerHTML =
        "<td>" + player.name + "</td>" +
        "<td>" + player.sport + "</td>" +
        "<td>" + player.level + "</td>" +
        "<td>" + player.lastPlayed + "</td>" +
        "<td>" + player.bookings + "</td>";

      const contactTd = el("td");
      const waBtn = el("a", "btn btn-small btn-whatsapp");
      waBtn.textContent = "WhatsApp";
      const message = "Hey " + player.name.split(" ")[0] + ", are you free for a match at " + CENTER_NAME + " this week?";
      waBtn.href = waLink(player.phone, message);
      waBtn.target = "_blank";
      waBtn.rel = "noopener noreferrer";
      contactTd.appendChild(waBtn);
      tr.appendChild(contactTd);

      body.appendChild(tr);
    });
  }

  /* ==========================================================================
     Owner preview
     ========================================================================== */
  function initOwnerPreview() {
    document.getElementById("viewDashboardBtn").addEventListener("click", function () {
      scrollToId("dashboard");
    });

    document.getElementById("simulateBookingBtn").addEventListener("click", function () {
      scrollToId("book");
      window.setTimeout(runSimulatedBooking, prefersReducedMotion ? 0 : 450);
    });

    const ownerWhatsappBtn = document.getElementById("ownerWhatsappBtn");
    const message = "Bonjour Kick Off, je souhaite confirmer ma réservation pour un terrain de football aujourd'hui à 20h00. Paiement sur place.";
    ownerWhatsappBtn.href = waLink(CONTACT.footballWA, message);
  }

  function runSimulatedBooking() {
    resetBookingForm();

    const today = new Date().toISOString().slice(0, 10);
    document.getElementById("bookSport").value = "football";
    updateSportFields();
    document.getElementById("pitchType").value = "5v5";
    updatePitchOptions();
    document.getElementById("bookDate").value = today;
    document.getElementById("bookTime").value = "20:00";
    document.getElementById("pitchCourt").value = "Terrain 5v5 B";
    document.getElementById("bookingType").value = "open";
    toggleOpenMatchFields();
    document.getElementById("playersConfirmed").value = "7";
    document.getElementById("playersNeeded").value = "3";
    document.getElementById("matchLevel").value = "Intermediate";
    document.getElementById("playerName").value = "Ayoub (simulated player)";
    document.getElementById("playerPhone").value = "+212 6XX XXX XXX";

    document.getElementById("bookingForm").dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
  }

  /* ==========================================================================
     Init
     ========================================================================== */
  document.addEventListener("DOMContentLoaded", function () {
    initNav();
    initTabs();
    renderSlots();
    initBookingForm();
    renderMatches();
    renderStats();
    renderSchedule();
    renderPlayers();
    initOwnerPreview();
  });
})();
