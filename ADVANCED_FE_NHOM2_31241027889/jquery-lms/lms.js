/* Mở trang môn học trên LMS, rồi chạy toàn bộ đoạn mã trong Console. */
(async function () {
  try {
    if (!window.jQuery) {
      await new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://code.jquery.com/jquery-3.7.1.min.js";
        script.onload = resolve;
        script.onerror = () => reject(new Error("Không tải được jQuery."));
        document.head.appendChild(script);
      });
    }
    const $ = window.jQuery;
    const clean = (text) => text.replace(/\s+/g, " ").trim();
    const dueLabel =
      /^(?:due(?: date)?|deadline|hạn(?: nộp| chót| cuối)?|ngày (?:hết hạn|đến hạn|nộp)|đến hạn)\s*[:：]?$/i;
    const deadlineSelector =
      '[data-region="activity-dates"], .activity-dates, .activity-date, .availabilityinfo';
    const assignments = $(".modtype_assign");
    const nameOf = (activity) => {
      const name = activity.find(".instancename").first().clone();
      name.find(".accesshide, .sr-only, .visually-hidden").remove();
      return (
        clean(name.text()) ||
        clean(
          activity.find('a[href*="/mod/assign/view.php"]').first().text(),
        ) ||
        "Bài tập"
      );
    };
    const linkOf = (activity) =>
      activity.find('a[href*="/mod/assign/view.php"]').first().prop("href");

    function readDeadline(root) {
      for (const element of root
        .find(
          "[data-region='activity-dates'] strong, .activity-dates strong, .activity-date strong, th, dt",
        )
        .get()) {
        if (!dueLabel.test(clean($(element).text()))) continue;
        const label = $(element);
        const value = label.is("th")
          ? label.next("td").text()
          : label.is("dt")
            ? label.next("dd").text()
            : label.parent().clone().children("strong").remove().end().text();
        if (clean(value)) return clean(value);
      }
      for (const element of root.find(deadlineSelector).get()) {
        const match = clean($(element).text()).match(
          /(?:^|\s)(?:due(?: date)?|deadline|hạn nộp|hạn chót|ngày hết hạn|ngày đến hạn|đến hạn)\s*[:：]\s*(.+?)(?=\s+(?:opened|opens|available from|cut-off date|mở|ngày mở|ngày bắt đầu|đóng)\s*[:：]|$)/i,
        );
        if (match) return match[1];
      }
      return "";
    }

    const fetched = new Map();
    async function deadlineOf(activity) {
      const visible = readDeadline(activity);
      if (visible) return visible;
      const link = linkOf(activity);
      if (!link || new URL(link).origin !== location.origin)
        return "Chưa hiển thị";
      if (!fetched.has(link)) {
        try {
          const response = await fetch(link, { credentials: "same-origin" });
          if (
            !response.ok ||
            new URL(response.url).origin !== location.origin
          ) {
return "Không đọc được trang bài tập";
          }
          const page = new DOMParser().parseFromString(
            await response.text(),
            "text/html",
          );
          const inDetail = readDeadline($(page));
          fetched.set(link, inDetail || "Chưa tìm thấy hạn nộp");
        } catch {
          return "Không đọc được trang bài tập";
        }
      }
      return fetched.get(link);
    }

    console.log("=== CÂU 1: BÀI NỘP THỨ 5 ===");
    const fifth = assignments.eq(4);
    if (fifth.length) console.log(nameOf(fifth), linkOf(fifth) || "");
    else
      console.warn(
        "Chỉ tìm thấy " + assignments.length + " bài nộp trên trang hiện tại.",
      );

    console.log("=== CÂU 2: CHỦ ĐỀ, BÀI TẬP, DEADLINE ===");
    let sections = $(".course-section");
    if (!sections.length)
      sections = $("li.section, section.section, div.section.main");
    if (!sections.length) sections = $('[data-for="section"]');
    if (!sections.length)
      console.warn("Không tìm thấy chủ đề. Hãy mở trang chính của môn học.");
    const rows = [];
    for (const [index, element] of sections.get().entries()) {
      const section = $(element);
      const title =
        clean(
          section
            .find(".sectionname, .section-title, [data-for='section_title']")
            .first()
            .text(),
        ) || "Chủ đề " + (index + 1);
      const activities = section.find(".modtype_assign").filter(function () {
        return $(this).closest(sections)[0] === element;
      });
      if (!activities.length) {
        rows.push({
          STT: index + 1,
          "Chủ đề": title,
          "Có bài tập": "Không",
          "Bài tập": "—",
          Deadline: "—",
        });
      }
      for (const assignment of activities.get()) {
        const activity = $(assignment);
        rows.push({
          STT: index + 1,
          "Chủ đề": title,
          "Có bài tập": "Có",
          "Bài tập": nameOf(activity),
          Deadline: await deadlineOf(activity),
        });
      }
    }
    console.table(rows);
    window.nhom2LMSResult = rows;
  } catch (error) {
    console.error("Không hoàn tất được bài kiểm tra LMS:", error);
  }
})();