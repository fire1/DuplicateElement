/*
 * Copyright (C) 2015 Angel Zaprianov <me@fire1.eu>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

(function ($) {
    $.fn.duplicateElement = function (options) {
        options = $.extend($.fn.duplicateElement.defaults, options);
        return this.each(function () {
            var target = $(this);
            //
            // Create additional tag for dynamically adding
            var tag = document.createElement(options.tag_name);
            tag.setAttribute("id", options.tag_id);
            target[0].parentNode.appendChild(tag);
            //
            // Generate new field
            var i = 0;
            $(target, $("#" + options.tag_id)).on("click", options.class_create, function (event) {

                target.clone().addClass("dinamic-field").appendTo("#" + options.tag_id);
                $(options.class_remove).show();
                $(options.class_remove).first().hide();
                $(options.class_create).hide();
                $(options.class_create).first().show();
                event.preventDefault();
                i++;
                return false;
            });
            //
            // Hide remove button
            target.find(options.class_remove).first().hide();
            //
            // Remove operation
            $("#" + options.tag_id).on("click", options.class_remove, function (event) {

                $(this).parents(".dinamic-field").remove();
                event.preventDefault();
                return false;
            });

        });
    };
    //
    // Set up the default options.
    $.fn.duplicateElement.defaults = {
        tag_name: 'div',
        tag_id: "dinamic-fields",
        clone_model: "#clone-field-model",
        class_remove: ".remove-this-fields",
        class_create: ".create-new-fields"
    };
})(jQuery);
