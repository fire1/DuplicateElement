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
        var main = this;
        var $main = $(main).parent();

        /**
         * Generate new element
         * @param newElement
         * @param index
         */
        function createElement(newElement, index) {
            $main.find('#' + options.tag_id + index).append(newElement);
            //newElement.appendTo();
            $main.find(options.class_remove).show();
            $main.find(options.class_remove).last().hide();
            $main.find(options.class_create).hide();
            $main.find(options.class_create).last().show();
        }


        return this.each(function (index) {
            var target = $(this);
            //
            // Create additional tag for dynamically adding
            var tag = document.createElement(options.tag_name);
            tag.setAttribute("id", options.tag_id + index);
            target[0].parentNode.appendChild(tag);


            target.find(options.class_create).unbind();
            //
            // Generate new field
            target.parent().on("click", options.class_create, function (event) {
                var newElement,
                    isGenerate = $(this).parents(".dinamic-field"),
                    isStatic = $(this).parent();
                if (isGenerate.length > 0) {
                    console.log('static');
                    newElement = isGenerate.clone();
                } else if (isStatic.length > 0) {
                    console.log($(main));
                    newElement = $(main[index]).clone().addClass("dinamic-field");
                }

                //
                // Handle view of buttons
                createElement(newElement, index);
                //
                // Callback function on create
                if (typeof options.onCreate === "function") {
                    options.onCreate(newElement, $(this), event);
                }
                //
                // Prevent Default
                event.preventDefault();
                return false;
            });
            //
            // Hide remove button
            target.find(options.class_remove).first().hide();
            //
            // Remove operation
            $(target).parent().on("click", options.class_remove, function (event) {
                var isGenerate = $(this).parents(".dinamic-field");
                var isStatic = $(this).parents(target);
                if (isGenerate.length > 0) {
                    isGenerate.remove();
                } else if (isStatic.length > 0) {
                    $(target).empty();
                    $(target).hide();
                }
                //
                // Callback function on remove
                if (typeof options.onRemove === "function") {
                    options.onRemove($(this));
                }
                event.preventDefault();
                return false;
            });

        });
    };
    //
    // Set up the default options.
    $.fn.duplicateElement.defaults = {
        tag_name: 'div',
        tag_id: "#dinamic-fields",
        clone_model: "#clone-field-model",
        class_remove: ".remove-this-fields",
        class_create: ".create-new-fields",
        onCreate: "",
        onRemove: ""
    };
})(jQuery);